import Account from '../../sequelize/models/Account'
import CreateAccountModel from '../../models/account/create/CreateAccountModel'
import CreateUserModel from '../../models/user/create/CreateUserModel'
import User from '../../sequelize/models/User'
import FindUserModel from '../../models/user/findByUserName/FindUserModel'
import CreateUserService from '../../services/user/create/CreateUserService'
import CreateUserController from '../../controllers/user/create/CreateUserController'

// Model
const createAccountModel = new CreateAccountModel(Account)
const createUserModel = new CreateUserModel(User)
const findUserModel = new FindUserModel(User)

// Service
const createUserService = new CreateUserService(findUserModel, createUserModel, createAccountModel)

// Controller
const createUserController = new CreateUserController(createUserService)

export default createUserController
