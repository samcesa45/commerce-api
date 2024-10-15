import express, { Request, Response} from 'express'
import PasswordReset from '../../models/forgotPassword';
import bcrypt from 'bcrypt'
import User from '../../models/user';
const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/', async (req: Request, res: any) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(404).json({error: "User not found"});
    }

    const resetEntry = await PasswordReset.findOne({userId:user._id, expiresAt: {$gt: Date.now()}});

    if(!resetEntry) {
        return res.status(400).json({error:"Invalid email or otp"});
    }
    //Hash the new password and save it to the User collection
    const hashedPassword = await bcrypt.hash( newPassword, parseInt(process.env.SALT_ROUNDS!));

   user.passwordHash = hashedPassword;
   await user.save();

   await PasswordReset.deleteOne({_id:resetEntry._id});

    res.status(200).json({message:'Password has been reset successfully'});
});

export default resetPasswordRouter