import LoginUserController from '../../controllers/user/login/LoginUserController'
import FindUserModel from '../../models/user/findByUserName/FindUserModel'
import User from '../../sequelize/models/User'
import LoginUserService from '../../services/user/login/LoginUserService'

// Model
const findUserModel = new FindUserModel(User)

// Service
const loginUserService = new LoginUserService(findUserModel)

// Controller
const loginUserController = new LoginUserController(loginUserService)

export default loginUserController
