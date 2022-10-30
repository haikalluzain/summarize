import { IncomingMessage, ServerResponse } from 'http'
import jwt from 'jsonwebtoken'
import { ConnectDB } from 'models'
import { UserModel } from 'models/User'
import moment from 'moment-timezone'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { ironSession, Session } from 'next-iron-session'
import { IUser } from 'types/IUser'
import { responseUnauthorized } from './response'

export interface NextApiRequestWithSession extends NextApiRequest {
  user: IUser
  session: Session
}

const session = ironSession({
  cookieName: '_summirize',
  password: [
    {
      id: 1,
      password: 'hRFHDIneEj6EZzyliV1RJADcle3cOzoa',
    },
    {
      id: 2,
      password: '2nSy4jmSyXDAWKdns1sdNHBx9V6jdxmE',
    },
  ],
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
})

const initializeDB = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next
) => {
  try {
    await ConnectDB()
    next()
  } catch (e) {
    res.status(500).send('Error initialize database...')
    return
  }
}

const getTokenFormHeader = (req: NextApiRequest) => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const authMiddleware = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
  next
) => {
  try {
    req.user = null
    const token = getTokenFormHeader(req)
    if (req.session.get('user')) {
      const user = await UserModel.findOne({ _id: req.session.get('user') })
      if (user !== null) {
        req.user = JSON.parse(JSON.stringify(user.toJSON()))
      }
    } else if (token) {
      const decode: any = jwt.verify(
        token.toString(),
        process.env['JWT_SECRET']
      )
      req.user = await UserModel.findById(decode._id)
    }
  } catch (e) {
    console.error('[User]', e)
  }

  /**
   * Redirect if logedin
   */
  if (new RegExp('^/(register)', 'i').test(req.url)) {
    if (req.user !== null) {
      res.writeHead(302, {
        Location: '/main',
      })
      res.end()
      return { props: {} }
    }
  }

  /**
   * Redirect if not logedin
   */
  if (new RegExp('^/(main)', 'i').test(req.url)) {
    if (req.user === null) {
      res.writeHead(302, {
        Location: '/',
      })
      res.end()
      return { props: {} }
    }
  }

  const authorizedRoutes = [
    'auth/me',
    'auth/logout',
    'user',
    // 'seed'
  ]

  if (new RegExp(`^/api/(${authorizedRoutes.join('|')})`, 'i').test(req.url)) {
    if (req.user === null) {
      return responseUnauthorized(res)
    }
  }

  next()
}

const nextMiddleware = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
): Promise<any> => {
  const handler = nextConnect()
  handler.use(session).use(initializeDB).use(authMiddleware)
  await handler.run(req, res)

  moment.tz.setDefault('Asia/Jakarta')

  return req
}

export default nextMiddleware
