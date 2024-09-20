import express from 'express';
import { allOrders, checkout, userOrder, verify } from './payment.controller.js';
import { jwtAuth } from '../Middlewares/jwt.middleware.js';

const PaymentRouter=express.Router()

PaymentRouter.post('/checkout',checkout)
PaymentRouter.post('/verify-payment',verify)
PaymentRouter.get('/userOrder',jwtAuth,userOrder)
PaymentRouter.get('/orders',allOrders)

export default PaymentRouter;