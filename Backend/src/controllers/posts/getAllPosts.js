const Post = require('../../models/post.model')

const getAllPosts = async (req, res) => {
    try {
        // 1. Added 'author' to the extracted query parameters
        const { limit, category, author } = req.query

        const filter = {}
        if (category) {
            filter.category = category
        }
        
        // 2. Add author to the filter object if it exists in the query parameters
        if (author) {
            filter.author = author
        }

        let query = Post.find(filter)
            .populate('author', 'fullName profilePicture email')
            .sort({ createdAt: -1 })

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