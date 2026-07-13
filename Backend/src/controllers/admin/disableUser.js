const User = require('../../models/user.model')

const disableUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // prevent an admin from disabling their own account (or another admin's)
        if (user.isAdmin) {
            return res.status(400).json({ success: false, message: 'Cannot disable an admin account' })
        }

        user.isActive = false
        await user.save()

        res.json({ success: true, message: 'Account disabled successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to disable account' })
    }
}

module.exports = disableUser