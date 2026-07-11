const Post = require('../../models/post.model')

const getLikedPosts = async (req, res) => {
    try {
        const userId = req.user._id

        const posts = await Post.find({ likedBy: userId })
            .sort({ createdAt: -1 })
            .populate('author', 'fullName profilePicture email')

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch liked posts',
            error: err.message
        })
    }
}

module.exports = getLikedPosts