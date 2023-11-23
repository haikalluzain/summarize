import Button from 'components/bootstrap/Button'
import Card, {
  CardBody,
  CardHeader,
  CardLabel,
  CardSubTitle,
  CardTitle,
} from 'components/bootstrap/Card'
import Certificate from 'components/CvBuilder/Certificate'
import Education from 'components/CvBuilder/Education'
import Experience from 'components/CvBuilder/Experience'
import Language from 'components/CvBuilder/Language'
import PersonalDetail from 'components/CvBuilder/PersonalDetail'
import Skill from 'components/CvBuilder/Skill'
import Summary from 'components/CvBuilder/Summary'
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
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ICertificate } from 'types/ICertificate'
import { IEducation } from 'types/IEducation'
import { IExperience } from 'types/IExperience'
import { ILanguage } from 'types/ILanguage'
import { IPersonalDetail } from 'types/IPersonalDetail'
import { ISkill } from 'types/ISkill'
import { ISummary } from 'types/ISummary'
import nextMiddleware from 'utils/nextMiddleware'

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

type Props = {
  personalDetail: IPersonalDetail
  experiences: IExperience[]
  educations: IEducation[]
  skills: ISkill[]
  certificates: ICertificate[]
  languages: ILanguage[]
  summary: ISummary
}

const CvEditPage: NextPage<Props> = ({
  personalDetail,
  experiences,
  educations,
  skills,
  certificates,
  languages,
  summary,
}) => {
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
  const { query } = useRouter()
  const { id } = query

  return (
    <PageWrapper title={'Edit'}>
      <Page container="fluid">
        <div className="row h-100">
          <div className="col-xl-2 col-lg-3 col-md-5">
            <Card stretch>
              <CardHeader>
                <CardLabel icon="Person" iconColor="primary">
                  <CardTitle>CV Settings</CardTitle>
                  <CardSubTitle>Personal Information</CardSubTitle>
                </CardLabel>
              </CardHeader>
              <CardBody>
                <div className="row g-3">
                  <div className="col-12">
                    <Button
                      icon="Contacts"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.PERSONAL_DETAIL !== activeTab}
                      onClick={() => setActiveTab(TABS.PERSONAL_DETAIL)}
                    >
                      {TABS.PERSONAL_DETAIL}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="Work"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.EXPERIENCE !== activeTab}
                      onClick={() => setActiveTab(TABS.EXPERIENCE)}
                    >
                      {TABS.EXPERIENCE}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="School"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.EDUCATION !== activeTab}
                      onClick={() => setActiveTab(TABS.EDUCATION)}
                    >
                      {TABS.EDUCATION}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="Leaderboard"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.SKILL !== activeTab}
                      onClick={() => setActiveTab(TABS.SKILL)}
                    >
                      {TABS.SKILL}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="MilitaryTech"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.CERTIFICATE !== activeTab}
                      onClick={() => setActiveTab(TABS.CERTIFICATE)}
                    >
                      {TABS.CERTIFICATE}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="GTranslate"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.LANGUAGE !== activeTab}
                      onClick={() => setActiveTab(TABS.LANGUAGE)}
                    >
                      {TABS.LANGUAGE}
                    </Button>
                  </div>
                  <div className="col-12">
                    <Button
                      icon="Description"
                      color="primary"
                      className="w-100 p-3"
                      isLight={TABS.SUMMARY !== activeTab}
                      onClick={() => setActiveTab(TABS.SUMMARY)}
                    >
                      {TABS.SUMMARY}
                    </Button>
                  </div>
                </div>
              </CardBody>
              {/* <CardFooter>
                <CardFooterLeft className="w-100">
                  <Button
                    icon="Delete"
                    color="danger"
                    isLight
                    className="w-100 p-3"
                  >
                    Delete User
                  </Button>
                </CardFooterLeft>
              </CardFooter> */}
            </Card>
          </div>
          <div className="col-xl-10 col-lg-9 col-md-7">
            <div className="row h-100 justify-content-center">
              <div className="col-xl-6 col-lg-9 col-md-12">
                {TABS.PERSONAL_DETAIL === activeTab && (
                  <PersonalDetail resumeId={id as string} />
                )}
                {TABS.EXPERIENCE === activeTab && (
                  <Experience resumeId={id as string} />
                )}
                {TABS.EDUCATION === activeTab && (
                  <Education resumeId={id as string} />
                )}
                {TABS.SKILL === activeTab && <Skill resumeId={id as string} />}
                {TABS.LANGUAGE === activeTab && (
                  <Language data={languages} resumeId={id as string} />
                )}
                {TABS.SUMMARY === activeTab && (
                  <Summary data={summary} resumeId={id as string} />
                )}
                {TABS.CERTIFICATE === activeTab && (
                  <Certificate resumeId={id as string} />
                )}
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
    }).exec()
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

export default CvEditPage
