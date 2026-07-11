const User = require('../../models/user.model')

const resetPassword = async (req, res) => {
    try {
        const { email, otpCode, newPassword } = req.body
        const normalizedEmail = typeof email === 'string'
            ? email.trim().toLowerCase()
            : email

        if (!email || !otpCode || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email, OTP code and new password are required'
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            })
        }

        const user = await User.findOne({ email: normalizedEmail })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            })
        }

        if (user.otpCode !== otpCode) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired code'
            })
        }

        user.password = newPassword
        user.otpCode = null  // clear it so it can't be reused
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to reset password',
            error: err.message
        })
    }
}

module.exports = resetPassword
