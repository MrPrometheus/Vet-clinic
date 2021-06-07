import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
const { Sider } = Layout
import { UserOutlined } from '@ant-design/icons'

import React, { useContext, useState } from 'react'

import AuthContext from '../context/AuthContext'
import classes from './SideBar.module.css'
import routes from '../routing/routes'

export const SideBar = () => {
  const [collasped, setCollapsed] = useState<boolean>(() => false)
  const { typeAuth } = useContext(AuthContext)

  const onCollapse = (value: any) => {
    setCollapsed(value)
  }

  return (
    <Sider collapsible collapsed={collasped} onCollapse={onCollapse}>
      <div className={classes.logo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {typeAuth === 'user' ? (
          <>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.client}${routes.user_info}`}>Информация</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.client}${routes.appointment}`}>Запись на примем</Link>
            </Menu.Item>
          </>
        ) : typeAuth === 'doctor' ? (
          <>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.doctor}${routes.doctor_info}`}>Информация</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.doctor}${routes.doctor_card_record}`}>Записи в картах</Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.admin}${routes.admin_info}`}>Персонал</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to={`${routes.main}${routes.admin}${routes.admin_records}`}>Приемы</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  )
}

export default SideBar
