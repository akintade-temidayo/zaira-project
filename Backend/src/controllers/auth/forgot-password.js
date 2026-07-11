const User = require('../../models/user.model')

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const normalizedEmail = typeof email === 'string'
            ? email.trim().toLowerCase()
            : email

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            })
        }

        const user = await User.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        user.otpCode = otp
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Reset code generated',
            otpCode: otp  // frontend auto-fills this, same pattern as signup
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to generate reset code',
            error: err.message
        })
    }
}

module.exports = forgotPassword
