const User = require('../../models/user.model')

const generateOtp = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // generate random 6-digit code
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        // save to user's record in MongoDB
        user.otpCode = otp
        await user.save()

        res.status(200).json({
            success: true,
            message: 'OTP generated',
            otpCode: otp  // frontend auto-fills this
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate OTP',
            error: err.message
        })
    }
}

module.exports = generateOtp
