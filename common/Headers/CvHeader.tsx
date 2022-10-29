import Icon from 'components/icon/Icon'
import Header, { HeaderLeft } from 'layout/Header/Header'
import Link from 'next/link'
import CommonHeaderRight from './CommonHeaderRight'

const CvHeader = () => {
  return (
    <Header>
      <HeaderLeft>
        <div className="col d-flex align-items-center">
          <div className="me-3">
            <Link href="/main">
              <Icon
                icon="Apps"
                size="2x"
                className="cursor-pointer text-dark"
              />
            </Link>
          </div>
          <div>
            <div className="fw-bolder fs-3 mb-0 text-dark">Summarize</div>
          </div>
        </div>
      </HeaderLeft>
      <CommonHeaderRight />
    </Header>
  )
}

export default CvHeader
