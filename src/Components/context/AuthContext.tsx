import { createContext, useState } from 'react'

type AuthContextType = {
  isAuth: boolean
  toggleIsAuth?: (value: boolean) => unknown
}

const authDefaultValue: AuthContextType = {
  isAuth: false,
}

const AuthContext = createContext<AuthContextType>(authDefaultValue)
export default AuthContext

export const AuthContextProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState<boolean>(authDefaultValue.isAuth)

  const toggleIsAuth = (value: boolean): void => {
    setIsAuth(value)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        toggleIsAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
