const Post = require('../../models/post.model')

const getPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params; // ✅ extract slug from request

        const post = await Post.findOne({ slug })
                    .populate('author', 'fullName') 

        if (!post) {
            return res.status(404).json({ 
                success: false, 
                message: 'Post not found' 
            })
        }

        res.status(200).json({ success: true, data: post })
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch post', 
            error: err.message 
        })
    }
}

module.exports = getPostBySlug