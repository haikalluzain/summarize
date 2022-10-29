import Button from 'components/bootstrap/Button'
import Card from 'components/bootstrap/Card'
import AuthContext from 'contexts/authContext'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import moment from 'moment'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar'

const percentage = 66

const dummy = [
  {
    id: 'abc123',
    name: 'CV Haikal Updated',
    progress: 55,
  },
  {
    id: 'abc456',
    name: 'Untitled CV',
    progress: 0,
  },
  {
    id: 'abc789',
    name: 'Untitled CV  2',
    progress: 0,
  },
]

const Main: NextPage = () => {
  const { push } = useRouter()
  const { user, setUser } = useContext(AuthContext)

  const handleNavigate = useCallback(() => push('/'), [push])

  useEffect(() => {
    if (user) {
      push('/')
    }
  }, [user])

  const goToLoginPage = () => {
    push('/')
  }

  const handeGoToDetail = (id: string) => {
    push(`/main/cv/${id}`)
  }

  return (
    <PageWrapper isProtected={false}>
      <Page container="fluid">
        <div className="mt-5 mx-5">
          <div className="row">
            <div className="col-6">
              <h1>My CVs</h1>
            </div>
            <div className="col-6 text-end">
              <Button color="primary" size="lg" icon="Add" />
            </div>
          </div>
          <div className="row mt-5">
            {dummy.map((cv) => (
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-6 px-4">
                    <Card
                      className="rounded-0 py-5"
                      style={{ height: '300px' }}
                    >
                      <hr />
                    </Card>
                  </div>
                  <div className="col-6 px-4">
                    <div className="flex-grow-1">
                      <div className="mb-3" style={{ width: 50, height: 50 }}>
                        <CircularProgressbarWithChildren
                          value={cv.progress}
                          styles={buildStyles({
                            textSize: '25px',
                            textColor: '#4d69fa',
                            pathColor: '#4d69fa',
                          })}
                        >
                          <strong>{`${cv.progress}%`}</strong>
                        </CircularProgressbarWithChildren>
                      </div>
                      <p className="fs-5 fw-bold mb-1">{cv.name}</p>
                      <p className="text-muted">
                        {moment().format('DD MMM YYYY HH:mm:ss')}
                      </p>
                      <div className="row g-3">
                        <div className="col-12">
                          <Button
                            icon="Edit"
                            isLight
                            color="light"
                            onClick={() => handeGoToDetail(cv.id)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="col-12">
                          <Button icon="ContentCopy" isLight color="light">
                            Duplicate
                          </Button>
                        </div>
                        <div className="col-12">
                          <Button icon="Delete" isLight color="light">
                            Delete
                          </Button>
                        </div>
                        <div className="col-12 mt-4">
                          <Button icon="Download" isLight color="primary">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </PageWrapper>
  )
}

export default Main