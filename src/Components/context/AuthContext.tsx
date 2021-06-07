import { createContext, useState } from 'react'

type AuthContextType = {
  isAuth: boolean
  typeAuth?: 'user' | 'doctor'
  token?: string
  id?: string
  toggleTypeAuth?: (value: 'user' | 'doctor') => unknown
  toggleIsAuth?: (value: boolean) => unknown
  toggleToken?: (value: string) => unknown
  toggleId?: (value: string) => unknown
}

const authDefaultValue: AuthContextType = {
  isAuth: false,
}

const AuthContext = createContext<AuthContextType>(authDefaultValue)
export default AuthContext

export const AuthContextProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState<boolean>(authDefaultValue.isAuth)
  const [typeAuth, setTypeAuth] = useState<'user' | 'doctor'>()
  const [token, setToken] = useState<string>()
  const [id, setId] = useState<string>()

  const toggleIsAuth = (value: boolean): void => {
    setIsAuth(value)
  }

  const toggleTypeAuth = (value: 'user' | 'doctor') => {
    setTypeAuth(value)
  }

  const toggleId = (value: string) => {
    setId(value)
  }

  const toggleToken = (value: string) => {
    setToken(value)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        toggleIsAuth,
        typeAuth,
        toggleTypeAuth,
        token,
        toggleToken,
        id,
        toggleId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
