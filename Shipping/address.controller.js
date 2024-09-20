import { Address } from "./address.model.js";

export const addAddress=async (req,res)=>{
    const {fullName,address,city,state,country,pinCode,phoneNumber}=req.body
    const {userId}=req.userId
    const userAddress=await Address.create({
        userId,
        fullName,address,city,state,country,pinCode,phoneNumber
    })
    res.json({message:"Address added",userAddress,success:true})
}

export const getAddress=async (req,res)=>{
    let address=await Address.find({userId:req.userId}).sort({createdAt:-1})
    res.json({message:"address",userAddress:address[0]})
}
