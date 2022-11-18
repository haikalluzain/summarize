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
const CvEditPage: NextPage = () => {
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
                {TABS.PERSONAL_DETAIL === activeTab && <PersonalDetail />}
                {TABS.EXPERIENCE === activeTab && <Experience />}
                {TABS.EDUCATION === activeTab && <Education />}
                {TABS.SKILL === activeTab && <Skill />}
                {TABS.LANGUAGE === activeTab && <Language />}
                {TABS.SUMMARY === activeTab && <Summary />}
                {TABS.CERTIFICATE === activeTab && <Certificate />}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </PageWrapper>
  )
}

export default CvEditPage