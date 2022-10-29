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
import * as Yup from 'yup'

const PersonalDetail: React.FC<{}> = () => {
  const PersonalDetailSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().nullable(),
    jobTitle: Yup.string().required(),
    phoneNumber: Yup.string().min(9).required(),
    email: Yup.string().email().required(),
    website: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      phoneNumber: '',
      email: '',
      website: '',
      city: '',
      country: '',
    },
    validationSchema: PersonalDetailSchema,
    onSubmit: () => {},
  })

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="Contacts" iconColor="primary">
              <CardTitle>Personal Details</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody className="pb-0">
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
                    autoComplete="username"
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
              <Button
                type="submit"
                icon="Save"
                color="primary"
                isOutline
                isDisable={!formik.isValid && !!formik.submitCount}
              >
                Save
              </Button>
            </CardFooterRight>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default PersonalDetail
