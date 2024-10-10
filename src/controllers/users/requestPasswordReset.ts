
import PasswordReset from "../../models/forgotPassword";
import express, {Request, Response} from 'express';
import sendMail from "../../utils/sendMail";
import User from "../../models/user";
import crypto from 'crypto';
const requestResetPasswordRouter = express.Router();

requestResetPasswordRouter.post('/', async (req: Request, res: any) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({error:"User not found"});
    }
   
    //Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600;

    const passwordToken = await PasswordReset.create({
        userId: user._id,
        token: resetToken,
        createdAt: resetTokenExpiry
    })
    await passwordToken.save();

    const link = `${process.env.BASE_URL}/password-reset/${passwordToken.userId}/${passwordToken.token}`;
    await sendMail(user.email,"Password Reset", link);
    res.status(200).json({message:"Password reset link sent to your email account"});
});

export default requestResetPasswordRouter