import Button from 'components/bootstrap/Button'
import Card, { CardBody } from 'components/bootstrap/Card'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import AuthContext from 'contexts/authContext'
import { useFormik } from 'formik'
import useDarkMode from 'hooks/useDarkMode'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import * as Yup from 'yup'

type LoginPayloadType = {
  email: string
  password: string
}

const Login: NextPage = () => {
  const initialPayload: LoginPayloadType = {
    email: '',
    password: '',
  }
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const { darkModeStatus } = useDarkMode()

  const handleNavigate = useCallback(() => router.push('/'), [router])

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // const handleLogin = async (payload: LoginPayloadType) => {
  //   try {
  //     const { data } = await Api('CONFIGURATION').post('auth/signin', {
  //       ...payload,
  //     })
  //     const userData: IAuth = {
  //       ...data.data,
  //       token: data.auth_token,
  //     }
  //     if (setUser) {
  //       setUser(userData)
  //     }
  //     handleNavigate()
  //   } catch (error: any) {
  //     if (error?.message) {
  //       formik.setFieldError('email', error.message)
  //     }
  //   }
  // }

  const goToRegisterPage = () => {
    router.push('/register')
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialPayload,
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      // handleLogin(values)
      router.push('/main')
    },
  })
  return (
    <PageWrapper isProtected={false}>
      <Page className="p-0">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 shadow-3d-container">
            <Card className="shadow-3d-dark" data-tour="login-page">
              <CardBody>
                <div className="my-5 text-center">
                  {/* <Link
                    href="/"
                    className={classNames(
                      'text-decoration-none  fw-bold display-2',
                      {
                        'text-dark': !darkModeStatus,
                        'text-light': darkModeStatus,
                      }
                    )}
                  >
                    <div>Logo</div>
                    <img src={Logo} width="200" />
                  </Link> */}
                  <div className="mt-5 text-center h1 fw-bold">Welcome,</div>
                  <div className="mb-5 text-center h4 text-muted">
                    Sign in to continue!
                  </div>
                </div>
                <form className="row g-4">
                  <>
                    <div className="col-12">
                      <FormGroup id="email" isFloating label="Email">
                        <Input
                          type="email"
                          autoComplete="email"
                          value={formik.values.email}
                          isTouched={formik.touched.email}
                          invalidFeedback={formik.errors.email}
                          isValid={formik.isValid}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onFocus={() => {
                            formik.setErrors({})
                          }}
                          required
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12">
                      <FormGroup id="password" isFloating label="Password">
                        <Input
                          type="password"
                          placeholder="password"
                          autoComplete="current-password"
                          value={formik.values.password}
                          isTouched={formik.touched.password}
                          invalidFeedback={formik.errors.password}
                          isValid={formik.isValid}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                      </FormGroup>
                    </div>
                    {/* <div className="mt-2 col-12 text-end">
                      <Link
                        className="text-decoration-none fw-bold text-success"
                        href={`/${authPages.forgotPassword.path}`}
                      >
                        Forgot passwrod?
                      </Link>
                    </div> */}
                    <div className="col-12">
                      <Button
                        color="primary"
                        className="py-3 w-100"
                        onClick={formik.handleSubmit}
                      >
                        Login
                      </Button>
                    </div>
                  </>
                </form>
              </CardBody>
            </Card>
            <div className="row">
              <div className="col-12 text-center">
                <p>
                  New to Summirize?{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={goToRegisterPage}
                  >
                    Create your account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </PageWrapper>
  )
}

export default Login
