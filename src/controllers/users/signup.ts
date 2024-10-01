import User from "../../models/user";
import express,{Request, Response} from 'express';
import bcrypt from 'bcrypt';
const userRouter = express.Router();

userRouter.post('/', async(req:Request,res:Response)=>{
    const {name,email,password} = req.body

    const saltRounds = process.env.SALT_ROUNDS;
    const passwordHash = await bcrypt.hash(password, Number(saltRounds));

    const user = new User({
        name,
        email,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser);
})

export default userRouter