const User = require('../../models/user.model')

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        // req.user is attached by requireAuth middleware
        const user = req.user

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            })
        }

        // verify current password matches
        if (user.password !== currentPassword) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            })
        }

        // update password
        user.password = newPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update password',
            error: err.message
        })
    }
}

module.exports = updatePassword