import  jwt  from "jsonwebtoken"
import { User } from "../User/user.model.js"

export const jwtAuth=async (req,res,next)=>{
    const token=  req.header("Auth")

   
    if(!token) return res.json({message:"Login first"})

    const payload=jwt.verify(token,"VedPrakash")
    const id=payload.userId

    let user=await User.findById(id)

    if(!user) return res.json({message:"User doesn't exist."})

    req.userId=user
    next()
}