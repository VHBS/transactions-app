import { DataTypes, Model } from 'sequelize'
import db from '.'
import Account from './Account'
import ITransaction from './interfaces/ITransaction'

class Transaction extends Model implements ITransaction {
  declare id: string

  declare debitedAccountId: string

  declare creditedAccountId: string

  declare value: number

  declare createdAt: Date

  get getData () {
    return {
      id: this.id,
      value: this.value,
      debitedAccountId: this.debitedAccountId,
      creditedAccountId: this.creditedAccountId,
      createdAt: this.createdAt
    }
  }
}

Transaction.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    debitedAccountId: {
      type: DataTypes.UUID,
      field: 'debited_account_id',
      allowNull: false
    },
    creditedAccountId: {
      type: DataTypes.UUID,
      field: 'credited_account_id',
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: false,
    sequelize: db,
    modelName: 'Transaction',
    tableName: 'Transactions'
  }
)

Account.hasMany(Transaction, {
  foreignKey: 'debitedAccountId',
  as: 'debited_transactions'
})

Account.hasMany(Transaction, {
  foreignKey: 'creditedAccountId',
  as: 'credited_transactions'
})

Transaction.belongsTo(Account, {
  foreignKey: 'debitedAccountId',
  as: 'debited_account'
})

Transaction.belongsTo(Account, {
  foreignKey: 'creditedAccountId',
  as: 'credited_account'
})

export default Transaction
