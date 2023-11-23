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
import { IExperience } from 'types/IExperience'
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

type ExperienceProps = {
  resumeId: string
}

const initialExperience: IExperience = {
  jobTitle: '',
  company: '',
  startYear: moment().year(),
  startMonth: 'January',
  endYear: moment().year(),
  endMonth: 'January',
  current: false,
  description: '',
}

const Experience: React.FC<ExperienceProps> = ({ resumeId }) => {
  const [experiences, setExperiences] = useState<IExperience[]>(null)

  const onAddNew = () => {
    let newArr = [...experiences]
    newArr.push({ ...initialExperience, resume: resumeId })
    setExperiences(newArr)
  }

  useEffect(() => {
    getData(resumeId)
  }, [])

  const getData = async (resume: string) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/user/${resume}/experience`)
      setExperiences(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (index: number) => {
    try {
      let newArr = [...experiences]
      const exp = { ...newArr[index] }
      newArr.splice(index, 1)
      setExperiences(newArr)
      if (exp._id) {
        const { data } = await Api().delete(`/user/experience/${exp._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        {experiences &&
          experiences.map((experience, index) => (
            <Item
              experience={experience}
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

type ExperienceItemProps = {
  experience: IExperience
  firstIndex: boolean
  onDelete: () => void
}

const Item: React.FC<ExperienceItemProps> = ({
  experience,
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

  const ExperienceSchema = Yup.object().shape({
    jobTitle: Yup.string().required(),
    company: Yup.string().required(),
    startMonth: Yup.string().required(),
    startYear: Yup.string().required(),
    current: Yup.boolean().required(),
    endMonth: Yup.string().when('current', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().nullable(),
    }),
    endYear: Yup.string().when('current', {
      is: false,
      then: Yup.string().required(),
      otherwise: Yup.string().nullable(),
    }),
  })

  const formik = useFormik({
    initialValues: { ...experience },
    validationSchema: ExperienceSchema,
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

  const saveData = async (payload: IExperience) => {
    try {
      const { data } = await Api().post('/user/experience', payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (payload: IExperience) => {
    try {
      const { data } = await Api().put(
        `/user/experience/${payload._id}`,
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
          <CardLabel icon="Work" iconColor="primary">
            <CardTitle>Experience</CardTitle>
          </CardLabel>
        </CardHeader>
      )}
      <CardBody>
        <div className="row g-4">
          <div className="col-12">
            <FormGroup id="jobTitle" label="Job Title" isFloating>
              <Input
                placeholder="Job Title"
                autoComplete="job_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.isValid}
                value={formik.values.jobTitle}
                isTouched={formik.touched.jobTitle}
                invalidFeedback={formik.errors.jobTitle}
              />
            </FormGroup>
          </div>
          <div className="col-12">
            <FormGroup id="company" label="Company Name " isFloating>
              <Input
                placeholder="Company Name "
                autoComplete="company"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isValid={formik.isValid}
                value={formik.values.company}
                isTouched={formik.touched.company}
                invalidFeedback={formik.errors.company}
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
                        isValid={formik.isValid}
                        value={formik.values.startMonth}
                        isTouched={formik.touched.startMonth}
                        invalidFeedback={formik.errors.startMonth}
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
                        isValid={formik.isValid}
                        value={formik.values.startYear.toString()}
                        isTouched={formik.touched.startYear}
                        invalidFeedback={formik.errors.startYear}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <Label className="fw-bold">End</Label>
                <div className="row">
                  {!formik.values.current ? (
                    <>
                      <div className="col-md-6">
                        <FormGroup id="endMonth" label="Month" isFloating>
                          <Select
                            ariaLabel="endMonth"
                            placeholder="Month"
                            list={months}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={formik.isValid}
                            value={formik.values.endMonth}
                            isTouched={formik.touched.endMonth}
                            invalidFeedback={formik.errors.endMonth}
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
                            isValid={formik.isValid}
                            value={formik.values.endYear?.toString()}
                            isTouched={formik.touched.endYear}
                            invalidFeedback={formik.errors.endYear}
                          />
                        </FormGroup>
                      </div>
                    </>
                  ) : null}
                  <div className="col-12 mt-3">
                    <Checks
                      name="current"
                      type="checkbox"
                      id="currentlyWorkHere"
                      label="Currently work here"
                      onChange={formik.handleChange}
                      checked={formik.values.current}
                      isInline
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <FormGroup className="col" id="description">
              <Textarea
                placeholder="Accomplishment"
                onChange={formik.handleChange}
                value={formik.values.description || ''}
                isTouched={formik.touched.description}
                invalidFeedback={formik.errors.description}
                isValid={formik.isValid}
              />
            </FormGroup>
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

export default Experience
