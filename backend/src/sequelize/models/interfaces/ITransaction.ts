export default interface ITransaction {
  id: string
  debitedAccountId: string
  creditedAccountId: string
  value: number
  createdAt: Date
}
