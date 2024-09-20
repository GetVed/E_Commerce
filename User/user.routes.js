import express from 'express'
import { login, profile, register, users } from './user.controller.js'
import { jwtAuth } from '../Middlewares/jwt.middleware.js'

const UserRouter=express.Router()

UserRouter.post('/register',register)
UserRouter.post('/login',login)
UserRouter.get('/all',users)
UserRouter.get('/profile',jwtAuth,profile)

export default UserRouter;