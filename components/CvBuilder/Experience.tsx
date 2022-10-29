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
import Checks from 'components/bootstrap/forms/Checks'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import Label from 'components/bootstrap/forms/Label'
import Select from 'components/bootstrap/forms/Select'
import Textarea from 'components/bootstrap/forms/Textarea'
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
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

const Experience: React.FC<{}> = () => {
  const [years, setYears] = useState<SelectType[]>([])

  useEffect(() => {
    let yearList: SelectType[] = []
    for (let i = 2000; i <= moment().year(); i++) {
      yearList.push({
        text: i.toString(),
        value: i.toString(),
      })
    }
    setYears(yearList)
  }, [])

  const ExperienceSchema = Yup.object().shape({
    jobTitle: Yup.string().required(),
    company: Yup.string().required(),
    startMonth: Yup.string().required(),
    startYear: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      company: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    },
    validationSchema: ExperienceSchema,
    onSubmit: () => {},
  })

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="Work" iconColor="primary">
              <CardTitle>Experience</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody className="pb-0">
            <div className="row g-4">
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
                <FormGroup id="company" label="Email address" isFloating>
                  <Input
                    placeholder="Email address"
                    autoComplete="company"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company}
                    isValid={formik.isValid}
                    isTouched={formik.touched.company}
                    invalidFeedback={formik.errors.company}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <Label className="fw-bold">Start</Label>
                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup id="startMonth" label="Month" isFloating>
                          <Select
                            ariaLabel="startMonth"
                            placeholder="Month"
                            list={months}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startMonth}
                            isValid={formik.isValid}
                            isTouched={formik.touched.startMonth}
                            invalidFeedback={formik.errors.startMonth}
                            validFeedback="Looks good!"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup id="startYear" label="Year" isFloating>
                          <Select
                            ariaLabel="startYear"
                            placeholder="Year"
                            list={years}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startYear}
                            isValid={formik.isValid}
                            isTouched={formik.touched.startYear}
                            invalidFeedback={formik.errors.startYear}
                            validFeedback="Looks good!"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <Label className="fw-bold">End</Label>
                    <div className="row">
                      <div className="col-md-6">
                        <FormGroup id="endMonth" label="Month" isFloating>
                          <Select
                            ariaLabel="endMonth"
                            placeholder="Month"
                            list={months}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endMonth}
                            isValid={formik.isValid}
                            isTouched={formik.touched.endMonth}
                            invalidFeedback={formik.errors.endMonth}
                            validFeedback="Looks good!"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-6">
                        <FormGroup id="endYear" label="Year" isFloating>
                          <Select
                            ariaLabel="endYear"
                            placeholder="Year"
                            list={years}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.endYear}
                            isValid={formik.isValid}
                            isTouched={formik.touched.endYear}
                            invalidFeedback={formik.errors.endYear}
                            validFeedback="Looks good!"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-12 mt-3">
                        <Checks
                          type="checkbox"
                          id="currentlyWorkHere"
                          label="Currently work here"
                          // onChange={exampleInline.handleChange}
                          // checked={exampleInline.values.exampleInlineOne}
                          isInline
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <FormGroup
                  className="col"
                  id="exampleSizeTextareaLg"
                  label="Accomplishment"
                >
                  <Textarea placeholder="Placeholder" />
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

export default Experience
