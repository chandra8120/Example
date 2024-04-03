// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    otpCreatedAt: {
        type: Date,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
