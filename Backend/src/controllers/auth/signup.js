const User = require('../../models/user.model')

const signup = async (req, res) => {
    try {
        const { fullName, email, password, profilePicture } = req.body
        const normalizedEmail = typeof email === 'string'
            ? email.trim().toLowerCase()
            : email

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Full name, email and password are required'
            })
        }

        const existingUser = await User.findOne({ email: normalizedEmail })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists'
            })
        }

        // generate OTP immediately
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const newUser = await User.create({
            fullName,
            email: normalizedEmail,
            password,
            profilePicture: profilePicture || null,
            otpCode: otp,
            isVerified: false
        })

        res.status(201).json({
            success: true,
            message: 'Account created. Please verify your account.',
            token: newUser._id,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            },
            otpCode: otp  // frontend auto-fills this on OTP page
        })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists'
            })
        }

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            })
        }

        res.status(500).json({
            success: false,
            message: 'Signup failed',
            error: err.message
        })
    }
}

module.exports = signup
