
import PasswordReset from "../../models/forgotPassword";
import express, {Request, Response} from 'express';
import sendMail from "../../utils/sendMail";
import User from "../../models/user";
import crypto from 'crypto';
import { generateResetCode } from "../../utils/generateRandNumber";
const requestResetPasswordRouter = express.Router();

requestResetPasswordRouter.post('/', async (req: Request, res: any) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({error:"User not found"});
    }

    //Generate otp
    const otp = generateResetCode().toString()
    const otpExpiry = Date.now() + 3600000

    const passwordToken = await PasswordReset.create({
        userId: user._id,
        otp: otp,
        expiresAt: otpExpiry
    })                                                                                                                                                                                                                                      
    await passwordToken.save();

    await sendMail(user.email,"Password Reset Otp", otp);
    res.status(200).json({message:"Password reset link sent to your email account"});
});

export default requestResetPasswordRouter