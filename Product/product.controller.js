import { Products } from "./product.model.js";

export const addProduct=async (req,res)=>{
    const {title,description,price,category,qty,imgSrc}=req.body
   try{
     let product=await Products.create({title,description,price,category,qty,imgSrc})
     res.json({message:"Product added successfully...!",product})
   }catch(err){
    res.json(err.message)
   }
}

export const getProducts=async(req,res)=>{
  try{
    let products=await Products.find().sort({createdAt:-1})
    res.json({message:"All Products",products})
  }catch(err){
    res.json(err.message)
  }
}

export const getProductById=async(req,res)=>{
    const id=req.params.id
    try{
      let product=await Products.findById(id)
      if(!product) return res.json({message:"Invalid Id"})
      res.json({message:"Specific Product",product})
    }catch(err){
      res.json(err.message)
    }
  }

export const updateProductById=async(req,res)=>{
    const id=req.params.id
    try{
      let product=await Products.findByIdAndUpdate(id,req.body,{new:true})
      if(!product) return res.json({message:"Invalid Id"})
      res.json({message:"Product has been Updated.",product})
    }catch(err){
      res.json(err.message)
    }
 }

 export const deleteProductById=async(req,res)=>{
    const id=req.params.id
    try{
      let product=await Products.findByIdAndDelete(id)
      if(!product) return res.json({message:"Invalid Id"})
      res.json({message:"Product has been Deleted.",product})
    }catch(err){
      res.json(err.message)
    }
 }