import Card, { CardBody } from 'components/bootstrap/Card'
import Icon from 'components/icon/Icon'
import React from 'react'

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

const Sheet: React.FC<{}> = () => {
  return (
    <div className="row">
      <div className="col-12">
        <Card
          style={{
            borderRadius: 0,
            width: '900px',
            height: '1273px',
            padding: '60px',
          }}
        >
          <CardBody className="p-0 text-black">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-7 pe-0">
                    <h2 className="fw-bold">Haikal Fikri Luzain</h2>
                    <p className="h5">Software Engineer</p>
                  </div>
                  <div className="col-5 ps-0" style={{ fontSize: '14px' }}>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Phone" />
                        <span className="ms-2">0812345678</span>
                      </span>
                    </p>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Mail" />
                        <span className="ms-2">
                          haikalfikriluazain@gmail.com
                        </span>
                      </span>
                    </p>
                    <p className="mb-2">
                      <span>
                        <Icon icon="Link45Deg" />
                        <span className="ms-2">
                          https://www.linkedin.com/in/haikal-luzain
                        </span>
                      </span>
                    </p>
                    <p>
                      <span>
                        <Icon icon="LocationOn" />
                        <span className="ms-2">Jakarta, Indonesia</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-5">
                <h4 style={{ letterSpacing: '.3rem' }}>SUMMARY</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <p className="mt-3" style={{ fontSize: '14px' }}>
                  I have been focused on programming since high school. Even
                  though I haven&lsquo;t graduated with my bachelor&lsquo;s
                  degree, I can compete with those who already have. I can
                  easily learn new things in the software development orbit.
                </p>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>EXPERIENCE</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div className="row" style={{ fontSize: '14px' }}>
                  <div className="col-6">
                    <p className="mb-0" style={{ fontWeight: '500' }}>
                      Backend Developer
                    </p>
                    <span className="text-muted">KickAvenue</span>
                  </div>
                  <div className="col-6 text-end">
                    <p className="text-muted">Nov 2020 - Present</p>
                  </div>
                  <div className="col-12 mt-2">
                    <ul className="ps-3">
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
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>EDUCATION</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div style={{ fontSize: '14px' }}>
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        Computer Science
                      </p>
                      <span className="text-muted">
                        Mercu Buana University - Bachelor&lsquo;s Degree
                      </span>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">Mar 2020 - Present</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        Computer Science
                      </p>
                      <span className="text-muted">Software Engineering</span>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">Jun 2016 - Jun 2019</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>CERTIFICATES</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div style={{ fontSize: '14px' }}>
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        HackerRank - Go (Basic)
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">Apr 2022 - Present</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        HackerRank - SQL (Intermediate)
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">Mar 2022 - Present</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <p className="mb-0" style={{ fontWeight: '500' }}>
                        HackerRank - JavaScript (Intermediate)
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-muted">Mar 2022 - Present</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mt-4">
                <h4 style={{ letterSpacing: '.3rem' }}>SKILLS</h4>
                <hr style={{ borderTop: 'dotted 2px' }} />
                <div className="row" style={{ fontSize: '14px' }}>
                  <div className="col-6">
                    {skills1.map((skill, i) => (
                      <div className="row" key={i}>
                        <div className="col-6">
                          <p className="mb-0" style={{ fontWeight: '500' }}>
                            {skill.name}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted">{skill.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-6">
                    {skills2.map((skill, i) => (
                      <div className="row" key={i}>
                        <div className="col-6">
                          <p className="mb-0" style={{ fontWeight: '500' }}>
                            {skill.name}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted">{skill.rating}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
