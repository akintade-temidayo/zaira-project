const User = require('../../models/user.model')
const Post = require('../../models/post.model')

const getStats = async (req, res) => {
    try {
        const [totalUsers, totalPosts, disabledUsers] = await Promise.all([
            User.countDocuments(),
            Post.countDocuments(),
            User.countDocuments({ isActive: false })
        ])

        res.json({
            success: true,
            data: { totalUsers, totalPosts, disabledUsers }
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch stats' })
    }
}

module.exports = getStats