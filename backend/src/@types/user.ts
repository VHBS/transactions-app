import { AccountType } from './account'
import { MessageErrorType } from './error'

export type UserType = {
  userName: string;
  password?: string;
  accountId?: string;
  account?: AccountType
}

export type AuthUserServiceType = {
  user: UserType
  token: string
}

export type UserServiceType = {
  json: MessageErrorType | AuthUserServiceType
  status: number
}
