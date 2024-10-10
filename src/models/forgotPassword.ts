import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    token:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600,
        required:true
    }
})

const PasswordReset = mongoose.model('PasswordReset',passwordResetSchema);

export default PasswordReset