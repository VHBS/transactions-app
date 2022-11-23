export default interface IFindUserModel<T> {
  execute: (userName: string) => Promise<T | null>
}
