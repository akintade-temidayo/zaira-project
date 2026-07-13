const User = require('../../models/user.model')
const Post = require('../../models/post.model')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password -otpCode')
            .sort({ createdAt: -1 })

        // get post count for each user
        const usersWithPostCount = await Promise.all(
            users.map(async (user) => {
                const postCount = await Post.countDocuments({ author: user._id })
                return { ...user.toObject(), postCount }
            })
        )

        res.json({ success: true, data: usersWithPostCount })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' })
    }
}

module.exports = getAllUsers