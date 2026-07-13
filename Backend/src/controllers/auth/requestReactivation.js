const User = require('../../models/user.model')

const requestReactivation = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' })
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() })

        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email' })
        }

        if (user.isActive) {
            return res.status(400).json({ success: false, message: 'This account is not disabled' })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        user.otpCode = otp
        await user.save()

        res.json({
            success: true,
            message: 'Reactivation code generated',
            otpCode: otp
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to generate code' })
    }
}

module.exports = requestReactivation