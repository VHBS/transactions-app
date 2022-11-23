import { DataTypes, Model } from 'sequelize'
import db from '.'
import IAccount from './interfaces/IAccount'

class Account extends Model implements IAccount {
  declare id: string

  declare balance: number
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
    }
  },
  {
    underscored: true,
    timestamps: false,
    sequelize: db,
    modelName: 'Account',
    tableName: 'Accounts'
  }
)

export default Account
