import jwt from 'jsonwebtoken'

export const generateToken = (data: any) => {
  return jwt.sign(data, process.env['JWT_SECRET'], {
    // algorithm: 'RS256'
    // expiresIn: '1d'
  })
}
