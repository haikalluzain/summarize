import classNames from 'classnames'
import Alert from 'components/bootstrap/Alert'
import Button, { IButtonProps } from 'components/bootstrap/Button'
import Dropdown, {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'components/bootstrap/Dropdown'
import OffCanvas, {
  OffCanvasBody,
  OffCanvasHeader,
  OffCanvasTitle,
} from 'components/bootstrap/OffCanvas'
import Icon from 'components/icon/Icon'
import { NavLink } from 'components/NavLink'
import ThemeContext from 'contexts/themeContext'
import useDarkMode from 'hooks/useDarkMode'
import { HeaderRight } from 'layout/Header/Header'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { FC, ReactNode, useContext, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Api } from 'utils/api'

interface ICommonHeaderRightProps {
  beforeChildren?: ReactNode
  afterChildren?: ReactNode
}
const CommonHeaderRight: FC<ICommonHeaderRightProps> = ({
  beforeChildren,
  afterChildren,
}) => {
  const { darkModeStatus, setDarkModeStatus } = useDarkMode()
  const { push, query, pathname } = useRouter()

  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext)
  const styledBtn: IButtonProps = {
    color: darkModeStatus ? 'dark' : 'light',
    hoverShadow: 'default',
    isLight: !darkModeStatus,
    size: 'lg',
  }

  const [offcanvasStatus, setOffcanvasStatus] = useState(false)

  const { i18n } = useTranslation()

  const handleLogout = async () => {
    try {
      await Api().delete('auth/logout')
      push('/')
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Language attribute
   */
  useLayoutEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  })

  return (
    <HeaderRight>
      <div className="row g-5">
        {beforeChildren}

        {pathname === '/main/cv/[id]' ||
        pathname === '/main/cv/[id]/preview' ? (
          <div className="col-auto">
            <nav aria-label="summary-top-menu">
              <ul className="navigation navigation-menu">
                <li className="navigation-item">
                  <NavLink
                    className={classNames(
                      'navigation-link',
                      'navigation-link-pill',
                      {
                        // collapsed: !!children && !isHorizontal,
                        active: pathname === '/main/cv/[id]',
                      }
                    )}
                    href={`/main/cv/${query.id}`}
                  >
                    <span className="navigation-link-info">
                      <Icon className="navigation-icon" icon="Article" />
                      <span className="navigation-text">CV</span>
                    </span>
                  </NavLink>
                </li>
                <li className="navigation-item">
                  <NavLink
                    className={classNames(
                      'navigation-link',
                      'navigation-link-pill',
                      {
                        // collapsed: !!children && !isHorizontal,
                        active: pathname === '/main/cv/[id]/preview',
                      }
                    )}
                    href={`/main/cv/${query.id}/preview`}
                  >
                    <span className="navigation-link-info">
                      <Icon className="navigation-icon" icon="RemoveRedEye" />
                      <span className="navigation-text">Preview</span>
                    </span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}

        <div className="col-auto pt-1">
          <Dropdown>
            <DropdownToggle hasIcon={false}>
              <Button
                {...styledBtn}
                className="btn-only-icon"
                icon="Person"
                aria-label="Quick menu"
              />
            </DropdownToggle>
            <DropdownMenu isAlignmentEnd size="lg" className="overflow-hidden">
              <DropdownItem>Account Settings</DropdownItem>
              <DropdownItem isDivider />
              <DropdownItem>
                <span onClick={handleLogout}>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {afterChildren}
      </div>

      <OffCanvas
        id="notificationCanvas"
        titleId="offcanvasExampleLabel"
        placement="end"
        isOpen={offcanvasStatus}
        setOpen={setOffcanvasStatus}
      >
        <OffCanvasHeader setOpen={setOffcanvasStatus}>
          <OffCanvasTitle id="offcanvasExampleLabel">
            Notifications
          </OffCanvasTitle>
        </OffCanvasHeader>
        <OffCanvasBody>
          <Alert icon="ViewInAr" isLight color="info" className="flex-nowrap">
            4 new components added.
          </Alert>
          <Alert icon="ThumbUp" isLight color="warning" className="flex-nowrap">
            New products added to stock.
          </Alert>
          <Alert
            icon="Inventory2"
            isLight
            color="danger"
            className="flex-nowrap"
          >
            There are products that need to be packaged.
          </Alert>
          <Alert
            icon="BakeryDining"
            isLight
            color="success"
            className="flex-nowrap"
          >
            Your food order is waiting for you at the consultation.
          </Alert>
          <Alert
            icon="Escalator"
            isLight
            color="primary"
            className="flex-nowrap"
          >
            Escalator will turn off at 6:00 pm.
          </Alert>
        </OffCanvasBody>
      </OffCanvas>
    </HeaderRight>
  )
}
CommonHeaderRight.propTypes = {
  beforeChildren: PropTypes.node,
  afterChildren: PropTypes.node,
}
CommonHeaderRight.defaultProps = {
  beforeChildren: null,
  afterChildren: null,
}

export default CommonHeaderRight
