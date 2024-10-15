import {Request} from 'express'
import { IUser } from './interface/interface'

declare module 'express' {
    export interface Request {
        user?: IUser
    }
}