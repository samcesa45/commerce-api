import express, {Request, Response, response} from 'express'
import PasswordReset from '../../models/forgotPassword'
import authenticationToken from '../../utils/authenticationToken'
import User from '../../models/user'

const verifyOtpRouter = express.Router()

verifyOtpRouter.post('/',async (req:Request,res: any)=> {
    const {email, otp} = req.body
    
    const user = await User.findOne({email});

    if(!user) {
        return response.status(404).json({message:'User not found'});
    }
    const passwordToken = await PasswordReset.findOne({userId: user._id,otp:otp});

    if(!passwordToken || passwordToken.expiresAt.getTime() < Date.now()) {
        return res.status(400).json({error:"Invalid or expired OTP"})
    }

    res.status(200).json({message:'OTP verified successfully. You can now reset your password.'})
})

export default verifyOtpRouter