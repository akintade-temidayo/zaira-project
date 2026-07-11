// model...to run check on the middleware(mongoose)
// const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    profilePicture: {
        type: String,
        default: null  // base64 string of the image
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    otpCode: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false  // starts unverified
    },
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
