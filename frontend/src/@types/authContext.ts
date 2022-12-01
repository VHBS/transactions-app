import { MessageErrorType } from './error'
import { UserType } from './user'

export interface AuthContextType {
  userData: UserType | null
  setUserData: (user: UserType | null) => void
  handleUserRegister: (userName: string, password: string) => Promise<UserType | MessageErrorType>
  handleUserLogin: (userName: string, password: string) => Promise<UserType | MessageErrorType>
}
