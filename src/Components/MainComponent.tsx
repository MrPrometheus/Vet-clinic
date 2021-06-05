import { Button, Layout, Typography } from 'antd'
import AuthContext from './context/AuthContext'
import MainRoutes from './routing/MainRoutes'
import React, { useContext } from 'react'
import SideBar from './Navigation/SideBar'
import classes from './MainComponent.module.css'

const { Footer, Header, Content } = Layout

export const MainComponent = () => {
  const { toggleIsAuth, typeAuth } = useContext(AuthContext)
  return (
    <>
      <SideBar />
      <Layout className={classes.siteLayout}>
        <Header
          className={classes.siteLayoutBackground}
          style={{
            padding: 0,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Typography style={{ flexGrow: 1, marginLeft: '16px' }}>
            {typeAuth === 'user' ? 'Клиент' : 'Доктор'}
          </Typography>
          <Button style={{ marginRight: '16px' }} onClick={() => toggleIsAuth && toggleIsAuth(false)}>
            Выход
          </Button>
        </Header>
        <Content style={{ margin: '16px 16px 0 16px' }}>
          <div
            className={classes.siteLayoutBackground}
            style={{ height: '100%', padding: 24, minHeight: 360, backgroundColor: 'white' }}
          >
            <MainRoutes />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2021 Created by SuCe inc</Footer>
      </Layout>
    </>
  )
}

export default MainComponent
