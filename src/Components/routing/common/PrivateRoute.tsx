import { Redirect, Route } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import routes from '../routes'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const { isAuth } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.login,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
