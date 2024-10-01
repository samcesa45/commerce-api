import User from '../../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express, { Request, Response } from "express";
const loginRouter = express.Router();



const TOKEN_EXPIRY = 60 * 60; 

loginRouter.post('/', async (req: Request,res: any) =>{

    const { email,password } = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({error:'user not found'});
    }

    const passwordCorrect =  await bcrypt.compare(password,user.passwordHash!);
    
    if(!passwordCorrect){
        return res.status(401).json({error:'invalid email or password'});
    }

    const userToken = {
        email:user.email,
        id:user._id,
    };

    const token = jwt.sign(userToken, process.env.SECRET!, {
        expiresIn: TOKEN_EXPIRY,
    });

     res.status(200).json({token, email: user.email,message:'Login successful' });
    
});


export default loginRouter;
