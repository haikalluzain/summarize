import { useContext } from 'react'
import { useWindowSize } from 'react-use'
import ThemeContext from '../contexts/themeContext'

const useNavigationItemHandle = () => {
  const { setAsideStatus, setLeftMenuStatus, setRightMenuStatus } =
    useContext(ThemeContext)
  const { width } = useWindowSize()

  return () => {
    if (width < Number(process.env.MOBILE_BREAKPOINT_SIZE))
      setAsideStatus(false)
    setLeftMenuStatus(false)
    setRightMenuStatus(false)
  }
}
export default useNavigationItemHandle
