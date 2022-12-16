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
import Textarea from 'components/bootstrap/forms/Textarea'
import { useFormik } from 'formik'
import React from 'react'
import { ISummary } from 'types/ISummary'
import * as Yup from 'yup'

type SummaryProps = {
  data: ISummary
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  const SummarySchema = Yup.object().shape({
    summary: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: { ...data },
    validationSchema: SummarySchema,
    onSubmit: () => {},
  })

  return (
    <div className="row">
      <div className="col-12">
        <Card tag="form" noValidate onSubmit={formik.handleSubmit}>
          <CardHeader>
            <CardLabel icon="Work" iconColor="primary">
              <CardTitle>Summary</CardTitle>
            </CardLabel>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-12">
                <FormGroup id="summaryFormGroup">
                  <Textarea
                    rows={6}
                    placeholder="Your Professional Summary"
                    autoComplete="summary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.body}
                    isValid={formik.isValid}
                    isTouched={formik.touched.body}
                    invalidFeedback={formik.errors.body}
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

export default Summary
