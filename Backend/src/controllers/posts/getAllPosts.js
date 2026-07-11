const Post = require('../../models/post.model')

const getAllPosts = async (req, res) => {
    try {
        let query = Post.find()
            .populate('author', 'fullName profilePicture')  // ← add this
            .sort({ createdAt: -1 })

        const { limit } = req.query
        if (limit) {
            query = query.limit(Number(limit))
        }

        const posts = await query

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch posts',
            error: err.message
        })
    }
}

module.exports = getAllPosts