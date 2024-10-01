import express from 'express';
import 'express-async-errors';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose'
import logger from './utils/logger'
import config from './utils/config'
import userRouter from './controllers/users/signup'
import loginRouter from './controllers/users/login';
mongoose.set('strictQuery',false)

logger.info('connecting to',config.MONGODB_URI!)
mongoose
.connect(config.MONGODB_URI!)
.then(()=> {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
})

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use("/api/signup",userRouter);
app.use('/api/login',loginRouter);


export default app;


