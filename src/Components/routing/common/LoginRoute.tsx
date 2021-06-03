import { Redirect, Route } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import AuthContext from '../../context/AuthContext'
import React, { useContext } from 'react'
import routes from '../routes'

export type PrivateRouteProps = {
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  [key: string]: any
}

// eslint-disable-next-line react/prop-types
export const LoginRoute: React.FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const getRenderer = (isAuthenticated: boolean, props: any) => {
    if (isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: routes.main,
          }}
        />
      )
    }

    if (Component) {
      return <Component {...props} />
    }

    return <Redirect to={{ pathname: routes.login }} />
  }

  const { isAuth } = useContext(AuthContext)
  return <Route {...rest} render={(props: any) => getRenderer(isAuth, props)} />
}
