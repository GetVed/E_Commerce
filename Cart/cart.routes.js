import express from 'express'
import { addToCart, clearCart, decreasesProductQty, removeProductFromCart, userCart } from './cart.controller.js'
import { jwtAuth } from '../Middlewares/jwt.middleware.js'


const CartRouter=express.Router()

CartRouter.post('/add',jwtAuth,addToCart)
CartRouter.get('/user',jwtAuth,userCart)
CartRouter.delete('/remove/:productId',jwtAuth,removeProductFromCart)
CartRouter.delete('/clear',jwtAuth,clearCart)
CartRouter.post('/--qty',jwtAuth,decreasesProductQty)

export default CartRouter;