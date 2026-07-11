const Post = require('../../models/post.model')
const mongoose = require('mongoose')

const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, recipe, category, image } = req.body
        const normalizedCategory = typeof category === 'string'
            ? category.trim().toLowerCase()
            : category

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

        // make sure only the author can update their own post
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only edit your own posts'
            })
        }

        // only update fields that were actually sent
        if (title) post.title = title
        if (content) post.content = content
        if (recipe) post.recipe = recipe
        if (category) post.category = normalizedCategory
        if (image !== undefined) post.image = image

        await post.save()  
        // pre-save hook regenerates slug if title changed

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: post
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            })
        }

        if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
            return res.status(409).json({
                success: false,
                message: 'A post with this title already exists'
            })
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update post',
            error: err.message
        })
    }
}

module.exports = updatePost
