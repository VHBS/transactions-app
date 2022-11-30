import React, {
  createContext, useMemo, useState
} from 'react'
import { AuthContextType } from '../@types/authContext'
import { MessageErrorType } from '../@types/error'
import { UserType } from '../@types/user'
import { handleFetchUserRegister, handleFetchUserLogin } from '../utils/api'

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [userData, setUserData] = useState<UserType | null>(null)

  const handleUserRegister = async (
    userName: string,
    password: string
  ): Promise<UserType | MessageErrorType> => {
    const responseUserRegister = await handleFetchUserRegister(userName, password) as UserType
    if ('token' in responseUserRegister) {
      setUserData(responseUserRegister)
      return responseUserRegister
    }

    return responseUserRegister
  }

  const handleUserLogin = async(
    userName: string,
    password: string
  ): Promise<UserType | MessageErrorType> => {
    const responseUserLogin = await handleFetchUserLogin(userName, password) as UserType

    if ('token' in responseUserLogin) {
      setUserData(responseUserLogin)
      return responseUserLogin
    }

    return responseUserLogin
  }

  const valueMemo = useMemo(() => ({
    handleUserRegister,
    userData,
    setUserData,
    handleUserLogin
  }), [userData])
  return (
    <AuthContext.Provider value={valueMemo}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
