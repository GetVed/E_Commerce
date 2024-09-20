import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import UserRouter from './User/user.routes.js';
import ProductRouter from './Product/product.routes.js';
import CartRouter from './Cart/cart.routes.js';
import AddressRouter from './Shipping/address.routes.js';
import PaymentRouter from './Payment/payment.routes.js';
import cors from 'cors'


const app = express()

app.use(bodyParser.json())

app.use(cors({
    origin:true,
    methods:["POST","PUT","DELETE","GET"],
    credentials:true
}))
//user Api
app.use('/api/user', UserRouter)

//product Api
app.use('/api/product',ProductRouter)

//cart Api
app.use('/api/cart',CartRouter)

//address Api
app.use('/api/address',AddressRouter)

//payment Api
app.use('/api/payment',PaymentRouter)

mongoose.connect(
    "mongodb+srv://vedu33prakash:dPj7jBFH9wp2jwl0@cluster0.q8yu6.mongodb.net/", {
    dbName: "E_Commerce"
}
).then(() => console.log("MongoDB connected Successfully...!")
).catch((err) => console.log(err));

const port = 3600
app.listen(port, () => console.log(`Server is listening on Port ${port}`))