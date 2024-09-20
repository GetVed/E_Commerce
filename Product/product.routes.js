import express from 'express'
import { addProduct, deleteProductById, getProductById, getProducts, updateProductById } from './product.controller.js'

const ProductRouter=express.Router()

ProductRouter.post('/add',addProduct)
ProductRouter.get('/all',getProducts)
ProductRouter.get('/:id',getProductById)
ProductRouter.put('/:id',updateProductById)
ProductRouter.delete('/:id',deleteProductById)

export default ProductRouter;