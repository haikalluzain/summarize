import classNames from 'classnames'
import { pages } from 'menu'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { forwardRef, ReactElement, useContext, useEffect } from 'react'
import AuthContext from '../../contexts/authContext'
import { IPageProps } from '../Page/Page'
import { ISubHeaderProps } from '../SubHeader/SubHeader'

interface IPageWrapperProps {
  isProtected?: boolean
  title?: string
  description?: string
  children:
    | ReactElement<ISubHeaderProps>[]
    | ReactElement<IPageProps>
    | ReactElement<IPageProps>[]
  className?: string
}
const PageWrapper = forwardRef<HTMLDivElement, IPageWrapperProps>(
  ({ isProtected, title, description, className, children }, ref) => {
    // useLayoutEffect(() => {
    //   // @ts-ignore
    //   document.getElementsByTagName('TITLE')[0].text = `${
    //     title ? `${title} | ` : ''
    //   }${process.env.SITE_NAME}`
    //   // @ts-ignore
    //   document
    //     ?.querySelector('meta[name="description"]')
    //     .setAttribute('content', description || process.env.META_DESC || '')
    // })

    const { user } = useContext(AuthContext)

    const router = useRouter()
    useEffect(() => {
      if (isProtected && user === '') {
        router.push(pages.login.path)
      }
      return () => {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        ref={ref}
        className={classNames('page-wrapper', 'container-fluid', className)}
      >
        {children}
      </div>
    )
  }
)
PageWrapper.displayName = 'PageWrapper'
PageWrapper.propTypes = {
  isProtected: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  // @ts-ignore
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
PageWrapper.defaultProps = {
  isProtected: false,
  title: undefined,
  description: undefined,
  className: undefined,
}

export default PageWrapper
