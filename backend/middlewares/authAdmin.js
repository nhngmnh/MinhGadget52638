import jwt from 'jsonwebtoken'

// ad authenication middleware
const authAdmin= async(req,res,next)=>{
    try {
        const {atoken}=req.headers
        if(!atoken){
            return res.json({success:false,message:'Not Authorized Login Again hehe',headers:req.headers})
        }
        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
        if (token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Not Authorized Login Again (Wrong credentials)'}) 
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export default authAdmin