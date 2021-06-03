import { Layout, Menu } from 'antd'
const { Sider } = Layout
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

import React, { useState } from 'react'

import classes from './SideBar.module.css'

export const SideBar = () => {
  const [collasped, setCollapsed] = useState<boolean>(() => false)

  const onCollapse = (value: any) => {
    setCollapsed(value)
  }

  return (
    <Sider collapsible collapsed={collasped} onCollapse={onCollapse}>
      <div className={classes.logo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Пункт 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Пункт 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Пункт 3
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SideBar
