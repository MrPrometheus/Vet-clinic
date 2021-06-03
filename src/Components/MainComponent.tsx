import { Layout } from 'antd'
import MainRoutes from './routing/MainRoutes'
import React from 'react'
import SideBar from './Navigation/SideBar'
import classes from '../App.module.css'

const { Footer, Header, Content } = Layout

export const MainComponent = () => {
  return (
    <>
      <SideBar />
      <Layout className={classes.siteLayout}>
        <Header className={classes.siteLayoutBackground} style={{ padding: 0, backgroundColor: 'white' }} />
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
