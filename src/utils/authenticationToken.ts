import {Request, Response, NextFunction, response} from 'express'
import jwt from 'jsonwebtoken'
import config from './config';

const authenticationToken = async (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        res.status(401).json({message:'unAthorized'})
        return;
    }
    
        jwt.verify(token, config.JWT_SECRET!, (err:any, user: any)=> {
            if(err) {
                res.status(401).json({message:'Error Verifying this token'})
                return;
            }
            req.user = user;
            next();
        })
}

export default authenticationToken