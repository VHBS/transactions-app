import { UserType } from '../../../../@types/user'

export default interface ICreateUserService<T> {
  execute: (user: UserType) => Promise<T>
}
