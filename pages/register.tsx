import Button from 'components/bootstrap/Button'
import Card, { CardBody } from 'components/bootstrap/Card'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import AuthContext from 'contexts/authContext'
import { useFormik } from 'formik'
import useDarkMode from 'hooks/useDarkMode'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import { IUser } from 'types/IUser'
import { Api } from 'utils/api'
import nextMiddleware from 'utils/nextMiddleware'
import * as Yup from 'yup'

type RegisterPayloadType = {
  name: string
  email: string
  password: string
  passwordConfirmation?: string
}

const initialPayload: RegisterPayloadType & IUser = {
  name: '',
  email: '',
  password: '',
}

const Register: NextPage = () => {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const { darkModeStatus } = useDarkMode()

  const handleNavigate = useCallback(() => router.push('/'), [router])

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(3).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords doesn`t match'
    ),
  })

  const handleRegister = async (payload: RegisterPayloadType) => {
    try {
      const { data } = await Api().post('auth/register', payload)
      handleNavigate()
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

  const goToLoginPage = () => {
    router.push('/')
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialPayload,
    validationSchema: RegisterSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      handleRegister(values)
    },
  })
  return (
    <PageWrapper isProtected={false}>
      <Page className="p-0">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 shadow-3d-container">
            <Card>
              <CardBody>
                <div className="my-5 text-center">
                  <div className="mt-5 text-center h2 fw-bold">
                    Create your account
                  </div>
                  <div className="mb-5 text-center h5 text-muted">
                    Please fulfill the form below
                  </div>
                </div>
                <form className="row g-4">
                  <>
                    <div className="col-12">
                      <FormGroup id="name" isFloating label="First Name">
                        <Input
                          autoComplete="name"
                          value={formik.values.name}
                          isTouched={formik.touched.name}
                          invalidFeedback={formik.errors.name}
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
                    <div className="col-12">
                      <FormGroup
                        id="passwordConfirmation"
                        isFloating
                        label="Password Confirmation"
                      >
                        <Input
                          type="password"
                          placeholder="passwordConfirmation"
                          autoComplete="passwordConfirmation"
                          value={formik.values.passwordConfirmation}
                          isTouched={formik.touched.passwordConfirmation}
                          invalidFeedback={formik.errors.passwordConfirmation}
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
                        Create Account
                      </Button>
                    </div>
                  </>
                </form>
              </CardBody>
            </Card>
            <div className="row">
              <div className="col-12 text-center">
                <p>
                  Already a member?{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={goToLoginPage}
                  >
                    Login
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

export default Register
