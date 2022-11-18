import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from 'components/bootstrap/Card'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import Select from 'components/bootstrap/forms/Select'
import Sheet from 'components/Preview/Sheet'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import { NextPage } from 'next'
import { useState } from 'react'

type TTabs =
  | 'Personal Details'
  | 'Experience'
  | 'Education'
  | 'Skills'
  | 'Certificates'
  | 'Language'
  | 'Summary'
interface ITabs {
  [key: string]: TTabs
}
const CvPreviewPage: NextPage = () => {
  const TABS: ITabs = {
    PERSONAL_DETAIL: 'Personal Details',
    EXPERIENCE: 'Experience',
    EDUCATION: 'Education',
    SKILL: 'Skills',
    CERTIFICATE: 'Certificates',
    LANGUAGE: 'Language',
    SUMMARY: 'Summary',
  }
  const [activeTab, setActiveTab] = useState<TTabs>(TABS.PERSONAL_DETAIL)

  return (
    <PageWrapper title={'Edit'}>
      <Page container="fluid">
        <div className="row h-100">
          <div className="col-xl-2 col-lg-3 col-md-5">
            <Card stretch shadow="none">
              <CardHeader>
                <CardLabel icon="Style" iconColor="primary">
                  <CardTitle>Styling</CardTitle>
                </CardLabel>
              </CardHeader>
              <CardBody>
                <div className="row g-3">
                  <div className="col-12">
                    <FormGroup label="Template" className="col-12">
                      <Select
                        ariaLabel="select-template"
                        placeholder="Template #1"
                        // onChange={formikOneWay.handleChange}
                        // value={
                        // 	formikOneWay.values
                        // 		.exampleSelectOneWay
                        // }
                        list={[
                          {
                            value: 'template-1',
                            text: 'Template #1',
                          },
                          {
                            value: 'template-2',
                            text: 'Template #2',
                          },
                          {
                            value: 'template-3',
                            text: 'Template #3',
                          },
                        ]}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup label="Language" className="col-12">
                      <Select
                        ariaLabel="select-language"
                        placeholder="English"
                        // onChange={formikOneWay.handleChange}
                        // value={
                        // 	formikOneWay.values
                        // 		.exampleSelectOneWay
                        // }
                        list={[
                          {
                            value: 'en',
                            text: 'English',
                          },
                          {
                            value: 'id',
                            text: 'Indonesia',
                          },
                        ]}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup label="Background" className="col-12">
                      <Input type="color" value="#fff" />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup label="Title Color" className="col-12">
                      <Input type="color" value="#fff" />
                    </FormGroup>
                  </div>
                  <div className="col-12">
                    <FormGroup label="Font" className="col-12">
                      <Select
                        ariaLabel="select-font"
                        placeholder="Poppins"
                        // onChange={formikOneWay.handleChange}
                        // value={
                        // 	formikOneWay.values
                        // 		.exampleSelectOneWay
                        // }
                        list={[
                          {
                            value: 'poppins',
                            text: 'Poppins',
                          },
                          {
                            value: 'roboto',
                            text: 'Roboto',
                          },
                          {
                            value: 'montserrat',
                            text: 'Montserrat',
                          },
                        ]}
                      />
                    </FormGroup>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-xl-10 col-lg-9 col-md-7">
            <div className="row h-100 justify-content-center">
              <div className="col-xl-8 col-lg-11 col-md-12">
                <Sheet />
              </div>
            </div>
          </div>
        </div>
      </Page>
    </PageWrapper>
  )
}

export default CvPreviewPage
