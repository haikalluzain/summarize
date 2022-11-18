import CvHeader from 'common/Headers/CvHeader'
import MainHeader from 'common/Headers/MainHeader'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HeaderRoutes = () => {
  const { pathname } = useRouter()
  useEffect(() => {
    console.log(pathname)
  }, [])

  const renderHeader = () => {
    if (pathname === '/main/cv/[id]' || pathname === '/main/cv/[id]/preview') {
      return <CvHeader />
    } else if (pathname === '/main') {
      return <MainHeader />
    }

    return null
  }
  return <>{renderHeader()}</>
}

export default HeaderRoutes
