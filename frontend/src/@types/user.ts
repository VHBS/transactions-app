import { AccountType } from './account'

export interface UserType {
  token: string
  user: { userName: string
    password?: string
    accountId?: string
    account: AccountType }
}
