import Button from 'components/bootstrap/Button'
import Card, { CardBody } from 'components/bootstrap/Card'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import useDarkMode from 'hooks/useDarkMode'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Api } from 'utils/api'
import nextMiddleware from 'utils/nextMiddleware'
import * as Yup from 'yup'

type LoginPayloadType = {
  email: string
  password: string
}

const Login: NextPage = ({ isLogin }: any) => {
  const initialPayload: LoginPayloadType = {
    email: '',
    password: '',
  }
  const { push } = useRouter()
  const { darkModeStatus } = useDarkMode()

  useEffect(() => {
    if (isLogin) {
      push('/main')
    }
  }, [isLogin, push])

  const handleLogin = async (payload: LoginPayloadType) => {
    try {
      const {
        data: { redirect },
      } = await Api().post('auth/login', payload)
      push(redirect)
    } catch (error: any) {
      if (error?.message) {
        if (error?.field) {
          formik.setFieldError(error.field, error.message)
        } else {
          formik.setFieldError('email', error.message)
        }
      }
    }
  }

  const goToRegisterPage = () => {
    push('/register')
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
      handleLogin(values)
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { user } = await nextMiddleware(req, res)
    return { props: { user: user, isLogin: !!user } }
  } catch (e) {
    return { props: { user: null, isLogin: null } }
  }
}

export default Login
