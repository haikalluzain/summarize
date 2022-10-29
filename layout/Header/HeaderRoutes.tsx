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
    if (new RegExp('^/main/(cv)', 'i').test(pathname)) {
      return <CvHeader />
    } else if (new RegExp('^/(main)', 'i').test(pathname)) {
      return <MainHeader />
    }

    return null
  }
  return <>{renderHeader()}</>
}

export default HeaderRoutes
