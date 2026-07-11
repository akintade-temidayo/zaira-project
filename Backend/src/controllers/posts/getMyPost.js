const Post = require('../../models/post.model')

const getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })
    .populate('author', 'fullName')  
    .sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch your posts',
            error: err.message
        })
    }
}

module.exports = getMyPosts