import { useTour } from '@reactour/tour'
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
import showNotification from 'components/extras/showNotification'
import Icon from 'components/icon/Icon'
import ThemeContext from 'contexts/themeContext'
import useDarkMode from 'hooks/useDarkMode'
import { getLangWithKey, ILang } from 'lang'
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
  const { push } = useRouter()

  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext)
  const styledBtn: IButtonProps = {
    color: darkModeStatus ? 'dark' : 'light',
    hoverShadow: 'default',
    isLight: !darkModeStatus,
    size: 'lg',
  }

  const [offcanvasStatus, setOffcanvasStatus] = useState(false)

  const { i18n } = useTranslation()

  const changeLanguage = (lng: ILang['key']['lng']) => {
    i18n.changeLanguage(lng)
    showNotification(
      <span className="d-flex align-items-center">
        <Icon icon={getLangWithKey(lng)?.icon} size="lg" className="me-1" />
        <span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
      </span>,
      'You updated the language of the site. (Only "Aside" was prepared as an example.)'
    )
  }

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

  const { setIsOpen } = useTour()

  return (
    <HeaderRight>
      <div className="row g-3">
        {beforeChildren}

        {/* Quick Panel */}
        <div className="col-auto">
          <Dropdown>
            <DropdownToggle hasIcon={false}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Button {...styledBtn} icon="Person" aria-label="Quick menu" />
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
