import { AccountType } from './account'

export type UserType = {
  userName: string;
  password?: string;
  accountId?: string;
  account?: AccountType
}

export type CreateUserServiceType = {
  user: UserType
  token: string
}
