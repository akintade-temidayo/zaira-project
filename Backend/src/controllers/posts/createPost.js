const Post = require('../../models/post.model')

const createPost = async (req, res) => {
    try {
        const { title, content, recipe, category, image } = req.body
        const normalizedCategory = typeof category === 'string'
            ? category.trim().toLowerCase()
            : category

        if (!title || !content || !recipe || !category) {
            return res.status(400).json({
                success: false,
                message: 'Title, content, recipe and category are required'
            })
        }

        const titleOnlyLetters = /^[a-zA-Z\s]+$/.test(title.trim())
            if (!titleOnlyLetters) {
                return res.status(400).json({
                    success: false,
                    message: 'Title can only contain letters and spaces — no numbers or special characters'
                })
            }

        const post = new Post({
            title,
            content,
            recipe,
            category: normalizedCategory,
            image: image || null,  // base64 string or null
            author: req.user._id   // from auth middleware
        })

        await post.save()  // pre-save hook generates slug automatically here

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post
        })
    } catch (err) {
        console.error('CREATE POST ERROR:', err)
        // handle mongoose validation errors cleanly
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
            message: 'Failed to create post',
            error: err.message
        })
    }
}

module.exports = createPost
