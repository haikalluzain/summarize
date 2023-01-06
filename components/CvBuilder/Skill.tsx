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
import React from 'react'
import { ISkill } from 'types/ISkill'
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
  data: ISkill[]
  resumeId: string
}

const Skill: React.FC<SkillProps> = ({ data, resumeId }) => {
  return (
    <div className="row">
      <div className="col-12">
        {data &&
          data.map((skill, index) => (
            <Item skill={skill} firstIndex={index === 0} />
          ))}
      </div>
    </div>
  )
}

type SkillItemProps = {
  skill: ISkill
  firstIndex: boolean
}

const Item: React.FC<SkillItemProps> = ({ skill, firstIndex }) => {
  const SkillSchema = Yup.object().shape({
    name: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: { ...skill },
    validationSchema: SkillSchema,
    onSubmit: () => {},
  })
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
          <Button color="danger" isLink type="reset" onClick={formik.resetForm}>
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

export default Skill
