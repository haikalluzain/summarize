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
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

type SelectType = {
  text: string
  value: string
}

const rating: SelectType[] = [
  {
    value: 'No Rating',
    text: 'No Rating',
  },
  {
    value: 'Beginner',
    text: 'Beginner',
  },
  {
    value: 'Intermediate',
    text: 'Intermediate',
  },
  {
    value: 'Advanced',
    text: 'Advanced',
  },
  {
    value: 'Expert',
    text: 'Expert',
  },
]

const Skill: React.FC<{}> = () => {
  const SkillSchema = Yup.object().shape({
    skill: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: {
      skill: '',
      rating: '-',
    },
    validationSchema: SkillSchema,
    onSubmit: () => {},
  })

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="Leaderboard" iconColor="primary">
              <CardTitle>Skill</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody>
            <div className="row">
              <Label>Before filling</Label>
              <div className="col-12">
                <FormGroup id="skill" label="Skill" isFloating>
                  <Input
                    placeholder="Skill"
                    autoComplete="skill"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skill}
                    isValid={formik.isValid}
                    isTouched={formik.touched.skill}
                    invalidFeedback={formik.errors.skill}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row mt-5">
              <Label>After filling</Label>
              <div className="col-6">
                <FormGroup id="skill" label="Skill" isFloating>
                  <Input
                    placeholder="Skill"
                    autoComplete="skill"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skill}
                    isValid={formik.isValid}
                    isTouched={formik.touched.skill}
                    invalidFeedback={formik.errors.skill}
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

export default Skill
