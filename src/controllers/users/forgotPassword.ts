import User from "../../models/user";
import express, {Request, Response} from 'express';
const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/', async (req: Request, res: Response) => {
    const {email} = req.body;
    const user = User.findOne({email});
});

export default resetPasswordRouter