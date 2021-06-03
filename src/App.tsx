import { Layout } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

import { AuthContextProvider } from './Components/context/AuthContext'
import LoginRoutes from './Components/routing/LoginRoutes'

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <LoginRoutes />
        </Layout>
      </AuthContextProvider>
    </Router>
  )
}

export default App
