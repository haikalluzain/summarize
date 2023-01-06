import classNames from 'classnames'
import Card, { CardBody } from 'components/bootstrap/Card'
import Icon from 'components/icon/Icon'
import React from 'react'
import { ICertificate } from 'types/ICertificate'
import { IEducation } from 'types/IEducation'
import { IExperience } from 'types/IExperience'
import { ILanguage } from 'types/ILanguage'
import { IPersonalDetail } from 'types/IPersonalDetail'
import { ISkill } from 'types/ISkill'
import { ISummary } from 'types/ISummary'

type PropsData = {
  personalDetail: IPersonalDetail
  experiences: IExperience[]
  educations: IEducation[]
  skills: ISkill[]
  certificates: ICertificate[]
  languages: ILanguage[]
  summary: ISummary
}

type Props = {
  data: PropsData
}

type Skill = {
  name: string
  rating: string
}

const skills1: Skill[] = [
  {
    name: 'PHP',
    rating: 'Expert',
  },
  {
    name: 'JavaScript',
    rating: 'Advanced',
  },
  {
    name: 'Golang',
    rating: 'Intermediate',
  },
  {
    name: 'SQL',
    rating: 'Advanced',
  },
  {
    name: 'No SQL',
    rating: 'Intermediate',
  },
]

const skills2: Skill[] = [
  {
    name: 'Mongo DB',
    rating: 'Intermediate',
  },
  {
    name: 'Typescript',
    rating: 'Advanced',
  },
  {
    name: 'Node js',
    rating: 'Advanced',
  },
  {
    name: 'React js',
    rating: 'Advanced',
  },
  {
    name: 'Next js',
    rating: 'Intermediate',
  },
]

const Sheet: React.FC<Props> = ({ data }) => {
  const {
    personalDetail,
    experiences,
    educations,
    skills,
    certificates,
    languages,
    summary,
  } = data

  return (
    <div className="row">
      <div className="col-12">
        <Card
          style={{
            borderRadius: 0,
            width: '900px',
            padding: '60px',
          }}
        >
          <CardBody className="p-0 text-black">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-7 pe-0">
                    <h2 className="fw-bold">
                      {personalDetail.firstName + ' ' + personalDetail.lastName}
                    </h2>
                    <p className="h5">{personalDetail.jobTitle}</p>
                  </div>
                  <div className="col-5 ps-0" style={{ fontSize: '14px' }}>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Phone" />
                        <span className="ms-2">
                          {personalDetail.phoneNumber}
                        </span>
                      </span>
                    </p>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Mail" />
                        <span className="ms-2">{personalDetail.email}</span>
                      </span>
                    </p>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Link45Deg" />
                        <span className="ms-2">{personalDetail.website}</span>
                      </span>
                    </p>
                    <p>
                      <span>
                        <Icon icon="LocationOn" />
                        <span className="ms-2">
                          {personalDetail.city}, {personalDetail.country}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-5">
                <h4 style={{ letterSpacing: '.3rem' }}>SUMMARY</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <p className="mt-3" style={{ fontSize: '14px' }}>
                  {summary.body}
                </p>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>EXPERIENCE</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                {experiences.map((experience, index) => (
                  <div
                    key={index}
                    className={classNames('row', {
                      'mt-3': index !== 0,
                    })}
                    style={{ fontSize: '14px' }}
                  >
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        {experience.jobTitle}
                      </p>
                      <span className="text-muted">{experience.company}</span>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">
                        {`${experience.startMonth.substring(0, 3)} ${
                          experience.startYear
                        }`}{' '}
                        -{' '}
                        {experience.current
                          ? 'Present'
                          : `${experience.endMonth.substring(0, 3)} ${
                              experience.endYear
                            }`}
                      </p>
                    </div>
                    <div className="col-12 mt-2">
                      {experience.description}
                      {/* <ul className="ps-3">
                      <li>
                        Develop a serverless function to enhance the search
                        feature for customers with ElasticSearch.
                      </li>
                      <li>
                        Creating an SQS consumer service for push notification.
                      </li>
                    </ul>
                    <span>Stacks</span>
                    <ul className="ps-3">
                      <li>PHP/Lumen</li>
                      <li>Go</li>
                      <li>PHPUnit & Testify</li>
                      <li>
                        AWS CodeCommit, CodePipeline, CloudWatch, S3, Lambda,
                        RDS, DynamoDB.
                      </li>
                    </ul> */}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>EDUCATION</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div style={{ fontSize: '14px' }}>
                  {educations.map((education, index) => (
                    <div
                      key={index}
                      className={classNames('row', {
                        'mt-3': index !== 0,
                      })}
                    >
                      <div className="col-6">
                        <p className="mb-0" style={{ fontWeight: '500' }}>
                          {education.fieldOfStudy}
                        </p>
                        <span className="text-muted">
                          {education.institute}{' '}
                          {education.degree ? `- ${education.degree}` : null}
                        </span>
                      </div>
                      <div className="col-6 text-end">
                        <p className="text-muted">{`${education.graduationMonth.substring(
                          0,
                          3
                        )} ${education.graduationYear}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>CERTIFICATES</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div style={{ fontSize: '14px' }}>
                  {certificates.map((certificate, index) => (
                    <div
                      key={index}
                      className={classNames('row', {
                        'mt-3': index !== 0,
                      })}
                    >
                      <div className="col-6">
                        <p className="mb-0" style={{ fontWeight: '500' }}>
                          {certificate.organization} - {certificate.name}
                        </p>
                      </div>
                      <div className="col-6 text-end">
                        <p className="text-muted">
                          {`${certificate.startMonth.substring(0, 3)} ${
                            certificate.startYear
                          }`}{' '}
                          -{' '}
                          {certificate.doesNotExpire
                            ? 'Present'
                            : `${certificate.endMonth.substring(0, 3)} ${
                                certificate.endYear
                              }`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>SKILLS</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div className="row" style={{ fontSize: '14px' }}>
                  {skills.map((skill, i) => (
                    <div className="col-6" key={i}>
                      <div className="row">
                        <div className="col-6">
                          <p className="mb-0" style={{ fontWeight: '500' }}>
                            {skill.name}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted">{skill.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Sheet
