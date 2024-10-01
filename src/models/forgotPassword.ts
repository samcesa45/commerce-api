import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    email:{
      type:String,
      required: true,
    },
    token:{
        type: String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600,
    }
})

const PasswordReset = mongoose.model('PasswordReset',passwordResetSchema);

export default PasswordReset