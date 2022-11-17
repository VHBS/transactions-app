import 'dotenv/config'
import { Dialect, Options } from 'sequelize'

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT),
  dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
  dialectOptions: {
    timezone: 'Z'
  },
  logging: false
}

module.exports = config
