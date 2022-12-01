export default interface ICreateUserModel<T> {
  execute: (user: T) => Promise<T>
}
