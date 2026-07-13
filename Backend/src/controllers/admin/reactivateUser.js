const User = require('../../models/user.model')

const reactivateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        user.isActive = true
        user.otpCode = null
        await user.save()

        res.json({ success: true, message: 'Account reactivated successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to reactivate account' })
    }
}

module.exports = reactivateUser