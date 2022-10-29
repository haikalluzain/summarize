import Header, { HeaderLeft } from 'layout/Header/Header'
import CommonHeaderRight from './CommonHeaderRight'

const MainHeader = () => {
  return (
    <Header>
      <HeaderLeft>
        <div className="col d-flex align-items-center">
          <div>
            <div className="fw-bolder fs-3 mb-0 text-dark">Summarize</div>
          </div>
        </div>
      </HeaderLeft>
      <CommonHeaderRight />
    </Header>
  )
}

export default MainHeader
