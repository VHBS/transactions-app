import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import db from '.'
import IUser from './interfaces/IUser'
import Account from './Account'

class User extends Model implements IUser {
  declare id: string

  declare userName: string

  declare password: string

  declare accountId: string

  declare createdAt: Date

  declare updatedAt: Date

  declare validPassword: (password: string) => boolean

  get getData () {
    return {
      id: this.id,
      userName: this.userName,
      createdAt: this.createdAt,
      updatedAt: this.createdAt
    }
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountId: {
      type: DataTypes.UUID,
      field: 'account_id',
      allowNull: false,
      unique: true
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
    modelName: 'User',
    tableName: 'Users',
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync()
        const cryptPassword = bcrypt.hashSync(user.password, salt)
        user.password = cryptPassword
      }
    }
  }
)

User.prototype.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

Account.hasOne(User, {
  foreignKey: 'accountId',
  as: 'account'
})

export default User
