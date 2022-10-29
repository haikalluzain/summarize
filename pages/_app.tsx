import COLORS from 'common/data/enumColors'
import { AuthContextProvider } from 'contexts/authContext'
import ThemeContext, { ThemeContextProvider } from 'contexts/themeContext'
import { getOS } from 'helpers/helpers'
import useDarkMode from 'hooks/useDarkMode'
import Wrapper from 'layout/Wrapper/Wrapper'
import type { AppProps } from 'next/app'
import { useContext, useEffect, useRef } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { ThemeProvider } from 'react-jss'
import { useFullscreen } from 'react-use'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  getOS()

  /**
   * Dark Mode
   */
  const { themeStatus, darkModeStatus } = useDarkMode()
  const theme = {
    theme: themeStatus,
    primary: COLORS.PRIMARY.code,
    secondary: COLORS.SECONDARY.code,
    success: COLORS.SUCCESS.code,
    info: COLORS.INFO.code,
    warning: COLORS.WARNING.code,
    danger: COLORS.DANGER.code,
    dark: COLORS.DARK.code,
    light: COLORS.LIGHT.code,
  }

  useEffect(() => {
    if (darkModeStatus) {
      document.documentElement.setAttribute('theme', 'dark')
    }
    return () => {
      document.documentElement.removeAttribute('theme')
    }
  }, [darkModeStatus])

  /**
   * Full Screen
   */
  // @ts-ignore
  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext)
  const ref = useRef(null)
  useFullscreen(ref, fullScreenStatus, {
    onClose: () => setFullScreenStatus(false),
  })
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>
          <div
            ref={ref}
            className="app vh-100"
            style={{
              backgroundColor: fullScreenStatus
                ? 'var(--bs-body-bg)'
                : undefined,
              zIndex: fullScreenStatus ? 1 : undefined,
              overflow: fullScreenStatus ? 'scroll' : undefined,
            }}
          >
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </div>
        </ThemeProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
