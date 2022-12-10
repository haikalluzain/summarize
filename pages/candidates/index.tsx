import classNames from 'classnames'
import Badge from 'components/bootstrap/Badge'
import Button from 'components/bootstrap/Button'
import Card, { CardBody, CardTitle } from 'components/bootstrap/Card'
import Input from 'components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import Page from 'layout/Page/Page'
import PageWrapper from 'layout/PageWrapper/PageWrapper'
import { FC, useState } from 'react'

import Icon from 'components/icon/Icon'
import data, { TTags } from 'dummy/knowledgeData'
import { getFirstLetter } from 'helpers/helpers'
import useDarkMode from 'hooks/useDarkMode'
import useTourStep from 'hooks/useTourStep'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { CandidateState, ICandidate } from 'types/Candidate'
import { TColor } from 'types/color'
import { Api } from 'utils/api'

interface IItemProps {
  id: string | number
  image: string
  title: string
  description: string
  tags: TTags[]
  color: TColor
}
type Props = {
  candidate: CandidateState
  keyword?: string
  country?: string
  city?: string
  sortBy?: string
}
type Query = {
  q?: string
  sortBy?: string
}
const Item: FC<ICandidate> = (candidate) => {
  useTourStep(15)
  const { darkModeStatus } = useDarkMode()

  const { push } = useRouter()
  // const handleOnClick = useCallback(
  // 	() => push(`../${demoPages.knowledge.subMenu.itemID.path}/${id}`),
  // 	[push, id],
  // );

  return (
    <Card
      className="cursor-pointer shadow-3d-primary shadow-3d-hover"
      // onClick={handleOnClick}
      data-tour={candidate.full_name}
    >
      <CardBody>
        <div className="row mb-4">
          <div className="col d-flex">
            <div className="flex-shrink-0">
              <div className="ratio ratio-1x1 me-3" style={{ width: 64 }}>
                <div
                  className={classNames(
                    'rounded-2',
                    'd-flex align-items-center justify-content-center',
                    `bg-l${darkModeStatus ? 'o25' : '10'}-dark`
                  )}
                >
                  <span className="fw-bold h4 mb-0">
                    {getFirstLetter(candidate.full_name)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow-1">
              <CardTitle>{candidate.full_name}</CardTitle>
              <p className="text-muted mb-1">
                <span className="align-middle">
                  <Icon icon="LocationOn" />
                  <span className="ms-2 align-bottom">
                    {candidate.country}, {candidate.city}
                  </span>
                </span>
              </p>
              <p className="text-muted mb-1">
                <span className="align-middle">
                  <Icon icon="Work" />
                  <span className="ms-2 align-bottom">
                    {candidate.job_title}
                  </span>
                </span>
              </p>
              <p className="text-muted mb-1">
                <span className="align-middle">
                  <Icon icon="AccessTime" />
                  <span className="ms-2 align-bottom">
                    3 Years of work experiences
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="row g-2">
          {!!candidate.skills &&
            // eslint-disable-next-line react/prop-types
            candidate.skills.map((skill) => (
              <div key={skill.name} className="col-auto">
                <Badge isLight color="dark" className="px-3 py-2">
                  {skill.name}
                </Badge>
              </div>
            ))}
        </div>
      </CardBody>
    </Card>
  )
}

const KnowledgeGridPage: NextPage<Props> = ({
  candidate,
  keyword,
  country,
  city,
  sortBy,
}) => {
  const { darkModeStatus } = useDarkMode()
  const { push } = useRouter()
  const [search, setSearch] = useState(keyword)
  const [sort, setSort] = useState(sortBy)

  const onSortChange = (e: any) => {
    e.preventDefault()
    let queries: Query = {}
    let sortVal = e.target.value
    if (sortVal) {
      queries.sortBy = sortVal
    }
    setSort(sortVal)
    if (search) {
      queries.q = search
    }

    push({
      pathname: '/search',
      query: queries,
    })
  }

  const [filterableData, setFilterableData] = useState(data)

  const debounce = (func: any, wait: number | undefined) => {
    let timeout: string | number | NodeJS.Timeout | undefined

    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const onFormSubmit = (values: { category: any; search: any }) => {
    const searchValue = values.search.toString().toLowerCase()
    let queries: Query = {}
    if (sort) {
      queries.sortBy = sort
    }
    if (searchValue) {
      queries.q = searchValue
    }

    push({
      pathname: '/candidates',
      query: queries,
    })
  }

  const formik = useFormik({
    initialValues: {
      search: '',
      category: '',
    },
    onSubmit: onFormSubmit,
    onReset: () => setFilterableData(data),
  })

  const resetFilter = () => {
    formik.resetForm()
    push({
      pathname: '/candidates',
    })
  }

  return (
    <PageWrapper title={'YOO TEST'}>
      <Page>
        <div className="row">
          <div className="col-12 text-center my-5">
            <span className="display-5 fw-bold">
              Hire talent passionate <br /> about tech & startups
            </span>
          </div>
          <div
            className="col-xxl-6 mx-auto text-center my-5"
            data-tour="knowledge-filter"
          >
            <form
              className={classNames('row', 'pb-4 px-3 mx-0 g-4', 'rounded-3', [
                `bg-l${darkModeStatus ? 'o25' : '10'}-primary`,
              ])}
              onSubmit={formik.handleSubmit}
            >
              {/* <div className="col-md-5">
                <Select
                  id="category"
                  size="lg"
                  ariaLabel="Category"
                  placeholder="All Category"
                  list={Object.keys(CATEGORIES).map((c) => CATEGORIES[c])}
                  className={classNames('rounded-1', {
                    'bg-white': !darkModeStatus,
                  })}
                  onChange={(e: { target: { value: any } }) => {
                    formik.handleChange(e)

                    if (e.target.value)
                      debounce(
                        () =>
                          onFormSubmit({
                            ...formik.values,
                            category: e.target.value,
                          }),
                        1000
                      )()
                  }}
                  value={formik.values.category}
                />
              </div> */}
              <div className="col-md-10">
                <Input
                  id="search"
                  size="lg"
                  placeholder="Search..."
                  className={classNames('rounded-1', {
                    'bg-white': !darkModeStatus,
                  })}
                  onChange={(e: { target: { value: string | any[] } }) => {
                    formik.handleChange(e)

                    if (e.target.value.length > 2)
                      debounce(
                        () =>
                          onFormSubmit({
                            ...formik.values,
                            search: e.target.value,
                          }),
                        1000
                      )()

                    if (e.target.value.length === 0) resetFilter()
                  }}
                  value={formik.values.search}
                />
              </div>
              <div className="col-md-2">
                <Button
                  size="lg"
                  icon="Close"
                  color="primary"
                  className="w-100"
                  rounded={1}
                  onClick={resetFilter}
                  type="reset"
                  isDisable={!(formik.values.search || formik.values.category)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row mb-5">
          {candidate.data.map((item) => (
            <div key={item._id} className="col-xl-6 col-lg-12 col-md-12">
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Item {...item} />
            </div>
          ))}
        </div>
      </Page>
    </PageWrapper>
  )
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<Query>) {
  try {
    let keyword = query.q || ''
    let candidate = {}
    let sortBy = query.sortBy || ''
    const { data } = await Api('ES').get('/search', {
      params: {
        keyword,
        sort_by: sortBy,
      },
    })
    candidate = data.data

    return {
      props: {
        candidate,
        keyword,
        sortBy,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        candidate: null,
        keyword: null,
        category: null,
      },
    }
  }
}

export default KnowledgeGridPage
