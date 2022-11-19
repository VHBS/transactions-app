export type UserType = {
  userName: string;
  password?: string;
  accountId?: string;
}

export type MessageErrorType = {
  message: string
}

export type CreateUserServiceTypeSuccess = {
  user: UserType
  token: string
}

export type CreateUserServiceType = CreateUserServiceTypeSuccess | MessageErrorType
