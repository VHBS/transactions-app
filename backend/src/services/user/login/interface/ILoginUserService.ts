import { UserType } from '../../../../@types/user'

export default interface ILoginUserService<T> {
  execute: (user: UserType) => Promise<T>
}
