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
import { CertificateModel } from 'models/Certificate'
import { EducationModel } from 'models/Education'
import { ExperienceModel } from 'models/Experience'
import { LanguageModel } from 'models/Language'
import { PersonalDetailModel } from 'models/PersonalDetail'
import { SkillModel } from 'models/Skill'
import { SummaryModel } from 'models/Summary'
import { GetServerSideProps, NextPage } from 'next'
import { ICertificate } from 'types/ICertificate'
import { IEducation } from 'types/IEducation'
import { IExperience } from 'types/IExperience'
import { ILanguage } from 'types/ILanguage'
import { IPersonalDetail } from 'types/IPersonalDetail'
import { ISkill } from 'types/ISkill'
import { ISummary } from 'types/ISummary'
import nextMiddleware from 'utils/nextMiddleware'

type Props = {
  personalDetail: IPersonalDetail
  experiences: IExperience[]
  educations: IEducation[]
  skills: ISkill[]
  certificates: ICertificate[]
  languages: ILanguage[]
  summary: ISummary
}

const CvPreviewPage: NextPage<Props> = (props) => {
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
                <Sheet data={props} />
              </div>
            </div>
          </div>
        </div>
      </Page>
    </PageWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  try {
    const { user } = await nextMiddleware(req, res)
    let resumeId = query.id
    let personalDetail = await PersonalDetailModel.findOne({
      resume: resumeId,
    }).exec()

    let experiences = await ExperienceModel.find({
      resume: resumeId,
    }).exec()
    let educations = await EducationModel.find({
      resume: resumeId,
    }).exec()
    let skills = await SkillModel.find({
      resume: resumeId,
    })
      .sort({ date: 'asc' })
      .exec()
    let certificates = await CertificateModel.find({
      resume: resumeId,
    }).exec()
    let languages = await LanguageModel.find({
      resume: resumeId,
    }).exec()

    let summary = await SummaryModel.findOne({
      resume: resumeId,
    }).exec()
    return {
      props: {
        user: user,
        isLogin: !!user,
        personalDetail: JSON.parse(JSON.stringify(personalDetail)),
        experiences: JSON.parse(JSON.stringify(experiences)),
        educations: JSON.parse(JSON.stringify(educations)),
        skills: JSON.parse(JSON.stringify(skills)),
        certificates: JSON.parse(JSON.stringify(certificates)),
        languages: JSON.parse(JSON.stringify(languages)),
        summary: JSON.parse(JSON.stringify(summary)),
      },
    }
  } catch (e) {
    return { props: { user: null, isLogin: null } }
  }
}

export default CvPreviewPage
