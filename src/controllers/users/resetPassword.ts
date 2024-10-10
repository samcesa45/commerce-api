import express, { Request, Response} from 'express'
import PasswordReset from '../../models/forgotPassword';
import bcrypt from 'bcrypt'
import User from '../../models/user';
const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/', async (req: Request, res: any) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const resetEntry = await PasswordReset.findOne({ token, createdAt: { $gt: Date.now() }})
    .populate('userId');

    if(!resetEntry) {
        return res.status(400).json({error:'Invalid or expired token'});
    }

    //Hash the new password and save it to the User collection
    const hashedPassword = await bcrypt.hash( newPassword, process.env.SALT_ROUNDS!);

    await User.findByIdAndUpdate(resetEntry.userId._id, { passwordHash: hashedPassword});

    //delete the reset token after it has been used
    await PasswordReset.deleteOne({_id: resetEntry._id});

    res.status(200).json({message:'Password has been reset successfully'});
});