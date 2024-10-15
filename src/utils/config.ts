import dotenv from 'dotenv'
dotenv.config();

const PORT= process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI 
const USER_NAME =  process.env.USER_NAME
const USER_PASS =  process.env.PASS
const HOST = process.env.HOST
const SENDER_EMAIL = process.env.SENDER_EMAIL
const JWT_SECRET = process.env.SECRET
export default {
    PORT,
    MONGODB_URI,
    USER_NAME,
    USER_PASS,
    SENDER_EMAIL,
    HOST,
    JWT_SECRET
}