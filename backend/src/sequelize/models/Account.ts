import { DataTypes, Model } from 'sequelize'
import db from '.'
import IAccount from './interfaces/IAccount'

class Account extends Model implements IAccount {
  declare id: string

  declare balance: number

  declare password: string

  declare createdAt: Date

  declare updatedAt: Date

  get getData () {
    return {
      id: this.id,
      balance: this.balance,
      createdAt: this.createdAt,
      updatedAt: this.createdAt
    }
  }
}

Account.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 10000
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'Account',
    tableName: 'Accounts'
  }
)

// User.hasOne(Collaborator, {
//   foreignKey: 'userId',
//   as: 'collaborator'
// })

export default Account
