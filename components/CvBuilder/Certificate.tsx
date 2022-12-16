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
import { useFormik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { ICertificate } from 'types/ICertificate'
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

type CertificateProps = {
  data: ICertificate[]
}

const Certificate: React.FC<CertificateProps> = ({ data }) => {
  return (
    <div className="row">
      <div className="col-12">
        {data &&
          data.map((certificate, index) => (
            <Item certificate={certificate} firstIndex={index === 0} />
          ))}
      </div>
    </div>
  )
}

type CertificateItemProps = {
  certificate: ICertificate
  firstIndex: boolean
}

const Item: React.FC<CertificateItemProps> = ({ certificate, firstIndex }) => {
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

  const CertificateSchema = Yup.object().shape({
    name: Yup.string().required(),
    organization: Yup.string().required(),
    startMonth: Yup.string().required(),
    startYear: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: { ...certificate },
    validationSchema: CertificateSchema,
    onSubmit: () => {},
  })

  return (
    <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
      {firstIndex && (
        <CardHeader>
          <CardLabel icon="MilitaryTech" iconColor="primary">
            <CardTitle>Certificate</CardTitle>
          </CardLabel>
        </CardHeader>
      )}
      <CardBody>
        <div className="row g-4">
          <div className="col-12">
            <FormGroup id="name" label="Certificate Name" isFloating>
              <Input
                placeholder="Certificate Name"
                autoComplete="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isValid={formik.isValid}
                isTouched={formik.touched.name}
                invalidFeedback={formik.errors.name}
                validFeedback="Looks good!"
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup id="organization" label="Organization Name " isFloating>
              <Input
                placeholder="Organization Name "
                autoComplete="organization"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.organization}
                isValid={formik.isValid}
                isTouched={formik.touched.organization}
                invalidFeedback={formik.errors.organization}
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
                        value={formik.values.startYear.toString()}
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
                        value={formik.values.endYear?.toString()}
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
                      id="doesNotExpire"
                      label="Does not Expire"
                      // onChange={exampleInline.handleChange}
                      // checked={exampleInline.values.exampleInlineOne}
                      isInline
                    />
                  </div>
                </div>
              </div>
            </div>
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

export default Certificate
