import React, {
  createContext, useMemo, useState
} from 'react'
import { AuthContextType } from '../@types/authContext'
import { MessageErrorType } from '../@types/error'
import { UserType } from '../@types/user'
import { handleFetchUserRegister } from '../utils/api'

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

  const valueMemo = useMemo(() => ({ handleUserRegister, userData, setUserData }), [userData])
  return (
    <AuthContext.Provider value={valueMemo}>
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
