import { createContext, useState } from 'react'

type AuthContextType = {
  isAuth: boolean
  typeAuth?: 'user' | 'doctor'
  toggleTypeAuth?: (value: 'user' | 'doctor') => unknown
  toggleIsAuth?: (value: boolean) => unknown
}

const authDefaultValue: AuthContextType = {
  isAuth: false,
}

const AuthContext = createContext<AuthContextType>(authDefaultValue)
export default AuthContext

export const AuthContextProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState<boolean>(authDefaultValue.isAuth)
  const [typeAuth, setTypeAuth] = useState<'user' | 'doctor'>()

  const toggleIsAuth = (value: boolean): void => {
    setIsAuth(value)
  }

  const toggleTypeAuth = (value: 'user' | 'doctor') => {
    setTypeAuth(value)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        toggleIsAuth,
        typeAuth,
        toggleTypeAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
