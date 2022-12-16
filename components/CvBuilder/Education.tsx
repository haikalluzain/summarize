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
import Label from 'components/bootstrap/forms/Label'
import Select from 'components/bootstrap/forms/Select'
import Textarea from 'components/bootstrap/forms/Textarea'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { IEducation } from 'types/IEducation'
import * as Yup from 'yup'

type SelectType = {
  text: string
  value: string
}

const months: SelectType[] = [
  {
    value: 'January',
    text: 'January',
  },
  {
    value: 'February',
    text: 'February',
  },
  {
    value: 'March',
    text: 'March',
  },
  {
    value: 'April',
    text: 'April',
  },
  {
    value: 'May',
    text: 'May',
  },
  {
    value: 'June',
    text: 'June',
  },
  {
    value: 'July',
    text: 'July',
  },
  {
    value: 'August',
    text: 'August',
  },
  {
    value: 'September',
    text: 'September',
  },
  {
    value: 'October',
    text: 'October',
  },
  {
    value: 'November',
    text: 'November',
  },
  {
    value: 'December',
    text: 'December',
  },
]

type EducationProps = {
  data: IEducation[]
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <div className="row">
      <div className="col-12">
        {data &&
          data.map((education, index) => (
            <Item education={education} firstIndex={index === 0} />
          ))}
      </div>
    </div>
  )
}

type EducationItemProps = {
  education: IEducation
  firstIndex: boolean
}

const Item: React.FC<EducationItemProps> = ({ education, firstIndex }) => {
  const [years, setYears] = useState<SelectType[]>([])

  useEffect(() => {
    let yearList: SelectType[] = []
    for (let i = 2000; i <= moment().add('year', 10).year(); i++) {
      yearList.push({
        text: i.toString(),
        value: i.toString(),
      })
    }
    setYears(yearList)
  }, [])

  const EducationSchema = Yup.object().shape({
    institute: Yup.string().required(),
    degree: Yup.string().required(),
    graduationYear: Yup.string().required(),
    graduationMonth: Yup.string().required(),
    fieldOfStudy: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: { ...education },
    validationSchema: EducationSchema,
    onSubmit: () => {},
  })

  return (
    <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
      {firstIndex && (
        <CardHeader>
          <CardLabel icon="School" iconColor="primary">
            <CardTitle>Education</CardTitle>
          </CardLabel>
        </CardHeader>
      )}
      <CardBody>
        <div className="row g-4">
          <div className="col-12">
            <FormGroup id="institute" label="University/School" isFloating>
              <Input
                placeholder="University/School"
                autoComplete="institute"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.institute}
                isValid={formik.isValid}
                isTouched={formik.touched.institute}
                invalidFeedback={formik.errors.institute}
                validFeedback="Looks good!"
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup id="degree" label="Degree" isFloating>
              <Input
                placeholder="Degree (E.g. Bachelor's Degree, High school Diploma, etc)"
                autoComplete="degree"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.degree}
                isValid={formik.isValid}
                isTouched={formik.touched.degree}
                invalidFeedback={formik.errors.degree}
                validFeedback="Looks good!"
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <div className="row">
              <Label className="fw-bold">Graduation</Label>
              <div className="col-md-6">
                <FormGroup id="graduationMonth" label="Month" isFloating>
                  <Select
                    ariaLabel="graduationMonth"
                    placeholder="Month"
                    list={months}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.graduationMonth}
                    isValid={formik.isValid}
                    isTouched={formik.touched.graduationMonth}
                    invalidFeedback={formik.errors.graduationMonth}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup id="graduationYear" label="Year" isFloating>
                  <Select
                    ariaLabel="graduationYear"
                    placeholder="Year"
                    list={years}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.graduationYear.toString()}
                    isValid={formik.isValid}
                    isTouched={formik.touched.graduationYear}
                    invalidFeedback={formik.errors.graduationYear}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="col-12">
            <FormGroup id="fieldOfStudy" label="Field of Study" isFloating>
              <Input
                placeholder="Field of Study"
                autoComplete="fieldOfStudy"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fieldOfStudy}
                isValid={formik.isValid}
                isTouched={formik.touched.fieldOfStudy}
                invalidFeedback={formik.errors.fieldOfStudy}
                validFeedback="Looks good!"
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup className="col" id="exampleSizeTextareaLg">
              <Textarea placeholder="Achievements" />
            </FormGroup>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <CardFooterLeft>
          <Button color="danger" isLink onClick={formik.resetForm}>
            Delete
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
  )
}

export default Education
