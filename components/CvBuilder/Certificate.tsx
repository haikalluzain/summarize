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
import { Api } from 'utils/api'
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
  resumeId: string
}

const initialCertificate: ICertificate = {
  name: '',
  organization: '',
  startYear: moment().year(),
  startMonth: 'January',
  endYear: moment().year(),
  endMonth: 'January',
  doesNotExpire: false,
  description: '',
}

const Certificate: React.FC<CertificateProps> = ({ resumeId }) => {
  const [certificates, setCertificates] = useState<ICertificate[]>(null)

  const onAddNew = () => {
    let newArr = [...certificates]
    newArr.push({ ...initialCertificate, resume: resumeId })
    setCertificates(newArr)
  }

  useEffect(() => {
    getData(resumeId)
  }, [])

  const getData = async (resume: string) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/user/${resume}/certificate`)
      setCertificates(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (index: number) => {
    try {
      let newArr = [...certificates]
      const exp = { ...newArr[index] }
      newArr.splice(index, 1)
      setCertificates(newArr)
      if (exp._id) {
        const { data } = await Api().delete(`/user/certificate/${exp._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        {certificates &&
          certificates.map((certificate, index) => (
            <Item
              certificate={certificate}
              firstIndex={index === 0}
              onDelete={() => deleteData(index)}
            />
          ))}
      </div>
      <div className="col-12">
        <Card>
          <CardBody className="d-flex align-items-center justify-content-center">
            <Button
              color="primary"
              size="lg"
              isLight
              className="w-100 h-100 py-4"
              icon="AddCircle"
              onClick={onAddNew}
            >
              Add New
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

type CertificateItemProps = {
  certificate: ICertificate
  firstIndex: boolean
  onDelete: () => void
}

const Item: React.FC<CertificateItemProps> = ({
  certificate,
  firstIndex,
  onDelete,
}) => {
  const [years, setYears] = useState<SelectType[]>([])
  const [saved, setSaved] = useState(false)

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
    onSubmit: (values) => {
      if (values._id) {
        updateData(values)
      } else {
        saveData(values)
      }
    },
  })

  useEffect(() => {
    setSaved(false)
  }, [formik.values])

  const saveData = async (payload: ICertificate) => {
    try {
      const { data } = await Api().post('/user/certificate', payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (payload: ICertificate) => {
    try {
      const { data } = await Api().put(
        `/user/certificate/${payload._id}`,
        payload
      )
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

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
                        value={formik.values.startYear?.toString()}
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
                  {!formik.values.doesNotExpire ? (
                    <>
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
                    </>
                  ) : null}
                  <div className="col-12 mt-3">
                    <Checks
                      name="doesNotExpire"
                      type="checkbox"
                      id="doesNotExpirel"
                      label="Does not Expire"
                      onChange={formik.handleChange}
                      checked={formik.values.doesNotExpire}
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
          <Button color="danger" isLink onClick={onDelete}>
            Delete
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
  )
}

export default Certificate
