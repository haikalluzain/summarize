import USERS from 'common/data/userDummyData'
import Avatar from 'components/Avatar'
import Button from 'components/bootstrap/Button'
import Card, {
  CardBody,
  CardFooter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardLabel,
  CardTitle,
} from 'components/bootstrap/Card'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { IPersonalDetail } from 'types/IPersonalDetail'
import { Api } from 'utils/api'
import * as Yup from 'yup'

type PersonalDetailProps = {
  resumeId: string
}

const PersonalDetail: React.FC<PersonalDetailProps> = ({ resumeId }) => {
  const [saved, setSaved] = useState(false)
  const [personalDetail, setPersonalDetail] = useState<IPersonalDetail>(null)

  const PersonalDetailSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().nullable(),
    jobTitle: Yup.string().required(),
    phoneNumber: Yup.string().min(9).required(),
    email: Yup.string().email().required(),
    website: Yup.string().nullable(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...personalDetail },
    validationSchema: PersonalDetailSchema,
    onSubmit: (values) => {
      if (values._id) {
        updateData(values)
      } else {
        saveData(values)
      }
    },
  })

  useEffect(() => {
    getData(resumeId)
  }, [])

  const getData = async (resume: string) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/user/${resume}/personal-detail`)
      setPersonalDetail(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setSaved(false)
  }, [formik.values])

  const saveData = async (payload: IPersonalDetail) => {
    try {
      const { data } = await Api().post('/user/personal-detail', payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (payload: IPersonalDetail) => {
    try {
      const { data } = await Api().put(
        `/user/personal-detail/${payload._id}`,
        payload
      )
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="Contacts" iconColor="primary">
              <CardTitle>Personal Details</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody>
            <div className="row g-4">
              <div className="col-12">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-auto">
                    <Avatar
                      srcSet={USERS.JOHN.srcSet}
                      src={USERS.JOHN.src}
                      color={USERS.JOHN.color}
                    />
                  </div>
                  <div className="col-lg">
                    <div className="row g-4">
                      <div className="col-auto">
                        <Input type="file" autoComplete="photo" />
                      </div>
                      <div className="col-auto">
                        <Button color="dark" isLight icon="Delete">
                          Delete Avatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 border-bottom" />
              <div className="col-md-6">
                <FormGroup id="firstName" label="First Name" isFloating>
                  <Input
                    placeholder="First Name"
                    autoComplete="additional-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.firstName}
                    invalidFeedback={formik.errors.firstName}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup id="lastName" label="Last Name" isFloating>
                  <Input
                    placeholder="Last Name"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    isValid={formik.isValid}
                    isTouched={formik.touched.lastName}
                    invalidFeedback={formik.errors.lastName}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup id="jobTitle" label="Job Title" isFloating>
                  <Input
                    placeholder="Job Title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.jobTitle}
                    isValid={formik.isValid}
                    isTouched={formik.touched.jobTitle}
                    invalidFeedback={formik.errors.jobTitle}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup id="email" label="Email Address" isFloating>
                  <Input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isValid={formik.isValid}
                    isTouched={formik.touched.email}
                    invalidFeedback={formik.errors.email}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup id="phoneNumber" label="Phone Number" isFloating>
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    autoComplete="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    isValid={formik.isValid}
                    isTouched={formik.touched.phoneNumber}
                    invalidFeedback={formik.errors.phoneNumber}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup id="website" label="Personal Website" isFloating>
                  <Input
                    type="url"
                    placeholder="Personal Website"
                    autoComplete="website"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.website}
                    isValid={formik.isValid}
                    isTouched={formik.touched.website}
                    invalidFeedback={formik.errors.website}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup id="city" label="City" isFloating>
                  <Input
                    placeholder="City"
                    autoComplete="city"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.city}
                    isValid={formik.isValid}
                    isTouched={formik.touched.city}
                    invalidFeedback={formik.errors.city}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup id="country" label="Country" isFloating>
                  <Input
                    placeholder="Country"
                    autoComplete="country"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    isValid={formik.isValid}
                    isTouched={formik.touched.country}
                    invalidFeedback={formik.errors.country}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <CardFooterLeft>
              <Button
                color="primary"
                isLink
                type="reset"
                onClick={formik.resetForm}
              >
                Reset
              </Button>
            </CardFooterLeft>
            <CardFooterRight>
              {!saved ? (
                <Button
                  type="submit"
                  icon="Save"
                  color="primary"
                  isOutline
                  isDisable={!formik.isValid && !!formik.submitCount}
                >
                  Save
                </Button>
              ) : (
                <Button type="submit" icon="Check" color="success">
                  Saved
                </Button>
              )}
            </CardFooterRight>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default PersonalDetail
