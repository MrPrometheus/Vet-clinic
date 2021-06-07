import { createContext, useState } from 'react'

type AuthContextType = {
  isAuth: boolean
  typeAuth?: 'user' | 'doctor' | 'admin'
  token?: string
  id?: string
  cardId?: string
  toggleTypeAuth?: (value: 'user' | 'doctor' | 'admin') => unknown
  toggleIsAuth?: (value: boolean) => unknown
  toggleToken?: (value: string) => unknown
  toggleId?: (value: string) => unknown
  toggleCardId?: (value: string) => unknown
}

const authDefaultValue: AuthContextType = {
  isAuth: false,
}

const AuthContext = createContext<AuthContextType>(authDefaultValue)
export default AuthContext

export const AuthContextProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState<boolean>(authDefaultValue.isAuth)
  const [typeAuth, setTypeAuth] = useState<'user' | 'doctor' | 'admin'>()
  const [token, setToken] = useState<string>()
  const [id, setId] = useState<string>()
  const [cardId, setCardId] = useState<string>()

  const toggleIsAuth = (value: boolean): void => {
    setIsAuth(value)
  }

  const toggleTypeAuth = (value: 'user' | 'doctor' | 'admin') => {
    setTypeAuth(value)
  }

  const toggleId = (value: string) => {
    setId(value)
  }

  const toggleToken = (value: string) => {
    setToken(value)
  }

  const toggleCardId = (value: string) => {
    setCardId(value)
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
        cardId,
        toggleCardId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
