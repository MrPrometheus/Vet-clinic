import { Redirect, Switch } from 'react-router'
import PrivateRoute from './common/PrivateRoute'
import routes from './routes'

export const MainRoutes = () => {
  return (
    <Switch>
      <PrivateRoute path={`${routes.main}/1`}>1</PrivateRoute>
      <PrivateRoute path={`${routes.main}/2`}>2</PrivateRoute>
      <PrivateRoute path={`${routes.main}/3`}>3</PrivateRoute>
      <PrivateRoute path={`${routes.main}/4`}>4</PrivateRoute>
      <Redirect to={`${routes.main}`} />
    </Switch>
  )
}

export default MainRoutes
