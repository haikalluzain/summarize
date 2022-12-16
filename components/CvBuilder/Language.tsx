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
import { ILanguage } from 'types/ILanguage'
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

type LanguageProps = {
  data: ILanguage[]
}

const Language: React.FC<LanguageProps> = ({ data }) => {
  return (
    <div className="row">
      <div className="col-12">
        {data &&
          data.map((language, index) => (
            <Item language={language} firstIndex={index === 0} />
          ))}
      </div>
    </div>
  )
}

type LanguageItemProps = {
  language: ILanguage
  firstIndex: boolean
}

const Item: React.FC<LanguageItemProps> = ({ language, firstIndex }) => {
  const LanguageSchema = Yup.object().shape({
    name: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: { ...language },
    validationSchema: LanguageSchema,
    onSubmit: () => {},
  })

  return (
    <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
      {firstIndex && (
        <CardHeader>
          <CardLabel icon="GTranslate" iconColor="primary">
            <CardTitle>Language</CardTitle>
          </CardLabel>
        </CardHeader>
      )}
      <CardBody>
        <div className="row">
          <div className="col-6">
            <FormGroup id="name" label="Language" isFloating>
              <Input
                placeholder="Language"
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

export default Language
