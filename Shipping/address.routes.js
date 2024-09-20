import express from 'express'
import { addAddress, getAddress } from './address.controller.js';
import { jwtAuth } from '../Middlewares/jwt.middleware.js';

const AddressRouter=express.Router()

AddressRouter.post('/add',jwtAuth,addAddress)
AddressRouter.get('/get',getAddress)

export default AddressRouter;