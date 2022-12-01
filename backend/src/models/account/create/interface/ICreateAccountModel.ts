export default interface ICreateAccountModel<T> {
  execute: () => Promise<T>
}
