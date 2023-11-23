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
import { ILanguage } from 'types/ILanguage'
import { Api } from 'utils/api'
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
  resumeId: string
}

const initialLanguage: ILanguage = {
  name: '',
  rating: '',
}

const Language: React.FC<LanguageProps> = ({ resumeId }) => {
  const [languages, setLanguages] = useState<ILanguage[]>(null)

  const onAddNew = () => {
    let newArr = [...languages]
    newArr.push({ ...initialLanguage, resume: resumeId })
    setLanguages(newArr)
  }

  useEffect(() => {
    getData(resumeId)
  }, [])

  const getData = async (resume: string) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/user/${resume}/language`)
      setLanguages(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (index: number) => {
    try {
      let newArr = [...languages]
      const lang = { ...newArr[index] }
      newArr.splice(index, 1)
      setLanguages(newArr)
      if (lang._id) {
        const { data } = await Api().delete(`/user/language/${lang._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        {languages &&
          languages.map((language, index) => (
            <Item
              language={language}
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

type LanguageItemProps = {
  language: ILanguage
  firstIndex: boolean
  onDelete: () => void
}

const Item: React.FC<LanguageItemProps> = ({
  language,
  firstIndex,
  onDelete,
}) => {
  const [saved, setSaved] = useState(false)
  const LanguageSchema = Yup.object().shape({
    name: Yup.string().required(),
    rating: Yup.string().nullable(),
  })

  const formik = useFormik({
    initialValues: { ...language },
    validationSchema: LanguageSchema,
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

  const saveData = async (payload: ILanguage) => {
    try {
      const { data } = await Api().post('/user/language', payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (payload: ILanguage) => {
    try {
      const { data } = await Api().put(`/user/language/${payload._id}`, payload)
      setSaved(true)
    } catch (error) {
      console.log(error)
    }
  }

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
