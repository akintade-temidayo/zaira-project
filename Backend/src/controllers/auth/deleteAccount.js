const User = require('../../models/user.model')

const deleteAccount = async (req, res) => {
    try {
        const user = req.user  // from auth middleware

        // set isActive to false — soft delete
        user.isActive = false
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete account',
            error: err.message
        })
    }
}

module.exports = deleteAccount