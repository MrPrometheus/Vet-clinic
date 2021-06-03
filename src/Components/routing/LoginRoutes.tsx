import { LoginRoute } from './common/LoginRoute'
import { Redirect, Switch } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import LoginPage from '../Login/LoginPage'
import MainComponent from '../MainComponent'
import routes from './routes'

export const LoginRoutes = () => {
  const { isAuth } = useContext(AuthContext)
  return (
    <Switch>
      <LoginRoute path={routes.login} exact component={LoginPage} />
      {isAuth && <MainComponent />}
      <Redirect to={isAuth ? `${routes.main}` : `${routes.login}`} />
    </Switch>
  )
}

export default LoginRoutes
