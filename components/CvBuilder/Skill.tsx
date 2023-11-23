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
import Select from 'components/bootstrap/forms/Select'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ISkill } from 'types/ISkill'
import { Api } from 'utils/api'
import * as Yup from 'yup'

type SelectType = {
  text: string
  value: string
}

const rating: SelectType[] = [
  {
    value: '',
    text: 'No Rating',
  },
  {
    value: 'beginner',
    text: 'Beginner',
  },
  {
    value: 'intermediate',
    text: 'Intermediate',
  },
  {
    value: 'advanced',
    text: 'Advanced',
  },
  {
    value: 'expert',
    text: 'Expert',
  },
]

type SkillProps = {
  resumeId: string
}

const initialSkill: ISkill = {
  name: '',
  rating: '',
}

const Skill: React.FC<SkillProps> = ({ resumeId }) => {
  const [skills, setSkills] = useState<ISkill[]>(null)

  const onAddNew = () => {
    let newArr = [...skills]
    newArr.push({ ...initialSkill, resume: resumeId })
    setSkills(newArr)
  }

  useEffect(() => {
    getData(resumeId)
  }, [])

  const getData = async (resume: string) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/user/${resume}/skill`)
      setSkills(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (index: number) => {
    try {
      let newArr = [...skills]
      const exp = { ...newArr[index] }
      newArr.splice(index, 1)
      setSkills(newArr)
      if (exp._id) {
        const { data } = await Api().delete(`/user/skill/${exp._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        {skills &&
          skills.map((skill, index) => (
            <Item
              skill={skill}
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

type SkillItemProps = {
  skill: ISkill
  firstIndex: boolean
  onDelete: () => void
}

const Item: React.FC<SkillItemProps> = ({ skill, firstIndex, onDelete }) => {
  const [saved, setSaved] = useState(false)

  const SkillSchema = Yup.object().shape({
    name: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: { ...skill },
    validationSchema: SkillSchema,
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

  const saveData = async (payload: ISkill) => {
    try {
      const { data } = await Api().post('/user/skill', payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (payload: ISkill) => {
    try {
      const { data } = await Api().put(`/user/skill/${payload._id}`, payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
      {firstIndex && (
        <CardHeader>
          <CardLabel icon="Leaderboard" iconColor="primary">
            <CardTitle>Skill</CardTitle>
          </CardLabel>
        </CardHeader>
      )}
      <CardBody>
        <div className="row">
          <div className="col-6">
            <FormGroup id="name" label="Skill" isFloating>
              <Input
                placeholder="Skill"
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
          <div className="col-md-6">
            <FormGroup id="rating" label="Rating" isFloating>
              <Select
                ariaLabel="rating"
                placeholder="Rating"
                list={rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
                isValid={formik.isValid}
                isTouched={formik.touched.rating}
                invalidFeedback={formik.errors.rating}
                validFeedback="Looks good!"
              />
            </FormGroup>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <CardFooterLeft>
          <Button color="danger" isLink type="reset" onClick={onDelete}>
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

export default Skill
