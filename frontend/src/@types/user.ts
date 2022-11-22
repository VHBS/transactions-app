import { AccountType } from './account'

export interface UserType {
  userName: string
  password?: string
  accountId?: string
  account?: AccountType
}
