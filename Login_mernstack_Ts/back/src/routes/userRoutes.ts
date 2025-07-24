import { Router } from 'express'
const route: Router = Router();

import * as userController from '../controllers/userControolller'
import * as auth from '../middlewares/auth'

// private routes
// route.get('/users', auth.authMiddleware, userController.getUserAll)
route.get('/users',  userController.getUserAll)
route.delete('/users',  userController.deleteUserAll)

// public routes
route.post('/register', userController.register)
route.post('/login', userController.login)


export default route;