import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/bootstrap/Button'
import Collapse from '../../components/bootstrap/Collapse'
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown'
import Icon from '../../components/icon/Icon'
import AuthContext from '../../contexts/authContext'
import useDarkMode from '../../hooks/useDarkMode'
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle'
import { NavigationLine } from '../Navigation/Navigation'

const User = () => {
  const { userData, setUser } = useContext(AuthContext)

  const { push } = useRouter()
  const handleItem = useNavigationItemHandle()
  const { darkModeStatus, setDarkModeStatus } = useDarkMode()

  const [collapseStatus, setCollapseStatus] = useState<boolean>(false)

  const { t } = useTranslation(['translation', 'menu'])

  return (
    <>
      <div
        className={classNames('user', { open: collapseStatus })}
        role="presentation"
        onClick={() => setCollapseStatus(!collapseStatus)}
      >
        <div className="user-avatar">
          <img
            srcSet={userData?.srcSet}
            src={userData?.src}
            alt="Avatar"
            width={128}
            height={128}
          />
        </div>
        <div className="user-info">
          <div className="user-name d-flex align-items-center">
            {`${userData?.name} ${userData?.surname}`}
            <Icon icon="Verified" className="ms-1" color="info" />
          </div>
          <div className="user-sub-title">{userData?.position}</div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownItem>
          <Button
            icon="AccountBox"
            // onClick={() =>
            //   push(
            //     `../${demoPages.appointment.subMenu.employeeID.path}/${userData?.id}`
            //   )
            // }
          >
            Profile
          </Button>
        </DropdownItem>
        <DropdownItem>
          <Button
            icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
            onClick={() => setDarkModeStatus(!darkModeStatus)}
            aria-label="Toggle fullscreen"
          >
            {darkModeStatus ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </DropdownItem>
      </DropdownMenu>

      <Collapse isOpen={collapseStatus} className="user-menu">
        <nav aria-label="aside-bottom-user-menu">
          <div className="navigation">
            <div
              role="presentation"
              className="cursor-pointer navigation-item"
              onClick={() =>
                push(
                  // `../${demoPages.appointment.subMenu.employeeID.path}/${userData?.id}`,
                  // @ts-ignore
                  handleItem()
                )
              }
            >
              <span className="navigation-link navigation-link-pill">
                <span className="navigation-link-info">
                  <Icon icon="AccountBox" className="navigation-icon" />
                  <span className="navigation-text">{t('menu:Profile')}</span>
                </span>
              </span>
            </div>
            <div
              role="presentation"
              className="cursor-pointer navigation-item"
              onClick={() => {
                setDarkModeStatus(!darkModeStatus)
                handleItem()
              }}
            >
              <span className="navigation-link navigation-link-pill">
                <span className="navigation-link-info">
                  <Icon
                    icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
                    color={darkModeStatus ? 'info' : 'warning'}
                    className="navigation-icon"
                  />
                  <span className="navigation-text">
                    {darkModeStatus ? t('menu:DarkMode') : t('menu:LightMode')}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </nav>
        <NavigationLine />
        <nav aria-label="aside-bottom-user-menu-2">
          <div className="navigation">
            <div
              role="presentation"
              className="cursor-pointer navigation-item"
              onClick={() => {
                if (setUser) {
                  setUser('')
                }
                // push(`../${demoPages.login.path}`)
              }}
            >
              <span className="navigation-link navigation-link-pill">
                <span className="navigation-link-info">
                  <Icon icon="Logout" className="navigation-icon" />
                  <span className="navigation-text">{t('menu:Logout')}</span>
                </span>
              </span>
            </div>
          </div>
        </nav>
      </Collapse>
    </>
  )
}

export default User
