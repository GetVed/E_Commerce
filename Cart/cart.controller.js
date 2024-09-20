import { Cart } from "./cart.model.js";


export const addToCart=async (req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body
    const userId=req.userId
    
    let cart=await Cart.findOne({userId})
    if(!cart){
        cart= new Cart({userId,items:[]})
    }

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

    if(itemIndex > -1){
       cart.items[itemIndex].qty +=qty,
       cart.items[itemIndex].price += price*qty
    }else{
        cart.items.push({productId,title,price,qty,imgSrc})
    }

    await cart.save();

    res.json({message:"Item added To Cart.",cart})
}

export const userCart=async (req,res)=>{
    const userId=req.userId

    let cart=await Cart.findOne({userId})
    if(!cart) return res.json({message:"Cart not Found."})

    res.json({message:"User Cart",cart})
}

export const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId
    const userId=req.userId

    let cart=await Cart.findOne({userId})
    if(!cart) return res.json({message:"Cart not Found."})

    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)

    await cart.save()

    res.json({message:"Product remove from Cart"})
}

export const clearCart=async(req,res)=>{
    const userId=req.userId
    let cart=await Cart.findOne({userId})
    if(!cart){
        cart=new Cart({items:[]})
    }else{
        cart.items=[];
    }

    await cart.save();
    res.json({message:"Cart Cleared."})
}

export const decreasesProductQty=async (req,res)=>{
    const {productId,qty}=req.body
    const userId=req.userId
    
    let cart=await Cart.findOne({userId})
    if(!cart){
        cart= new Cart({userId,items:[]})
    }

    const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)

    if(itemIndex > -1){
        const item=cart.items[itemIndex]
        if(item.qty>qty){
            const pricePerItem=item.price/item.qty
            item.qty -=qty
            item.price -=pricePerItem*qty
        }else{
            cart.items.splice(itemIndex,1)
        }
    }else{
      return res.json({message:"Invalid Product Id"})
    }

    await cart.save();

    res.json({message:"Items Qty Decreased.",cart})
}