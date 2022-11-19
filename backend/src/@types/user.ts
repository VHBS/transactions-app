export type UserType = {
  userName: string;
  password?: string;
  accountId?: string;
}

export type CreateUserServiceType = {
  user: UserType
  token: string
}
