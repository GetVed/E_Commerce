import { User } from "./user.model.js"
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken"

export const register = async (req, res) => {
    const { name, email, password } = req.body
    // console.log(req.body)
    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ message: "User Already exit", success: false })

        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashPass })
        res.json({ message: "User register Successfully...!", user, success: true })

    } catch (err) {
        res.json({ message: err.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return res.json({ message: "User Not Found.", success: false })
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.json({ message: "Invalid Credentials.", success: false })

        const token =jwt.sign({userId:user._id},"VedPrakash",{expiresIn:'3d'})
        res.json({ message: `Welcome ${user.name}`,token ,success: true })
    } catch (err) {
        res.json({ message: err.message })
    }
}

export const users=async (req,res)=>{
    try{
       let users=await User.find().sort({createdAt:-1})
       res.json(users)
    }catch(err){
        res.json(err.message)
    }
}

export const profile=async (req,res)=>{
    res.json({message:"User Profile",user:req.userId})
}