import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    otp:{
        type: String,
        required: true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const PasswordReset = mongoose.model('PasswordReset',passwordResetSchema);

export default PasswordReset