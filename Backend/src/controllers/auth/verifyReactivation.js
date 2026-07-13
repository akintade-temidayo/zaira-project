const User = require('../../models/user.model')

const verifyReactivation = async (req, res) => {
    try {
        const { email, otpCode } = req.body

        if (!email || !otpCode) {
            return res.status(400).json({ success: false, message: 'Email and code are required' })
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() })

        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found' })
        }

        if (user.otpCode !== otpCode) {
            return res.status(400).json({ success: false, message: 'Invalid code' })
        }

        user.isActive = true
        user.otpCode = null
        await user.save()

        res.json({
            success: true,
            message: 'Account reactivated successfully. You can now login.'
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to reactivate account' })
    }
}

module.exports = verifyReactivation