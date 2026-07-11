const Post = require('../../models/post.model')
const mongoose = require('mongoose')

const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post id'
            })
        }

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        // only the author can delete their own post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own posts'
            })
        }

        await Post.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete post',
            error: err.message
        })
    }
}

module.exports = deletePost
