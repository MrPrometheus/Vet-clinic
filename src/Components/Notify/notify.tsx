import { ArgsProps, IconType, NotificationPlacement } from 'antd/es/notification'
import { CSSProperties, ReactNode } from 'react'
import { CheckOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { notification } from 'antd'

import 'antd/dist/antd.css'
import classes from './notify.module.css'

const commonNotifyConfig: ArgsProps = {
  message: '',
  top: 64,
  placement: 'topRight',
  duration: 3,
  className: classes.notification,
}

export interface NotifyProps {
  message?: ReactNode
  description?: ReactNode
  btn?: ReactNode
  key?: string
  onClose?: () => void
  duration?: number | null
  icon?: ReactNode
  placement?: NotificationPlacement
  style?: CSSProperties
  prefixCls?: string
  className?: string
  readonly type?: IconType
  onClick?: () => void
  top?: number
  bottom?: number
  getContainer?: () => HTMLElement
  closeIcon?: ReactNode
}

export const openSuccess = ({
  message = <div style={{ color: 'white' }}>Успешно</div>,
  icon = <CheckOutlined type="text" style={{ color: 'white' }} />,
  style = { backgroundColor: 'rgba(70, 196, 50, 0.65)', color: 'white' },
  getContainer = () => document.body,
  ...other
}: NotifyProps) => {
  notification.success({
    ...commonNotifyConfig,
    message,
    icon,
    style,
    getContainer,
    ...other,
  })
}

export const openError = ({
  message = <div style={{ color: 'white' }}>Ошибка</div>,
  icon = <CloseCircleOutlined type="text" style={{ color: 'white' }} />,
  style = { backgroundColor: 'rgba(197, 9, 9, 0.65)', color: 'white' },
  ...other
}: NotifyProps) => {
  notification.error({
    ...commonNotifyConfig,
    message,
    icon,
    style,
    ...other,
  })
}

export const openWarning = ({
  message = <p style={{ color: 'black' }}>Предпреждение!</p>,
  icon = <WarningOutlined type="text" style={{ color: 'black' }} />,
  style = { backgroundColor: 'rgba(245,245,10,0.75)' },
  ...other
}: NotifyProps) => {
  notification.warning({
    ...commonNotifyConfig,
    message,
    icon,
    style,
    ...other,
  })
}

export const notificationDestroy = (): void => {
  notification.destroy()
}
