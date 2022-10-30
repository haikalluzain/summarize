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
    value: 'Basic',
    text: 'Basic',
  },
  {
    value: 'Intermediate',
    text: 'Intermediate',
  },
  {
    value: 'Fluent',
    text: 'Fluent',
  },
  {
    value: 'Native',
    text: 'Native',
  },
]

const Language: React.FC<{}> = () => {
  const LanguageSchema = Yup.object().shape({
    language: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: {
      language: '',
      rating: '-',
    },
    validationSchema: LanguageSchema,
    onSubmit: () => {},
  })

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="GTranslate" iconColor="primary">
              <CardTitle>Language</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody>
            <div className="row">
              <Label>Before filling</Label>
              <div className="col-12">
                <FormGroup id="language" label="Language" isFloating>
                  <Input
                    placeholder="Language"
                    autoComplete="language"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language}
                    isValid={formik.isValid}
                    isTouched={formik.touched.language}
                    invalidFeedback={formik.errors.language}
                    validFeedback="Looks good!"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row mt-5">
              <Label>After filling</Label>
              <div className="col-6">
                <FormGroup id="language" label="Language" isFloating>
                  <Input
                    placeholder="Language"
                    autoComplete="language"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language}
                    isValid={formik.isValid}
                    isTouched={formik.touched.language}
                    invalidFeedback={formik.errors.language}
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

export default Language
