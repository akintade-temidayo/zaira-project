const Post = require('../../models/post.model')

const toggleLike = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }

        const alreadyLiked = post.likedBy.some(
            (uid) => uid.toString() === userId.toString()
        )

        if (alreadyLiked) {
            post.likedBy = post.likedBy.filter(
                (uid) => uid.toString() !== userId.toString()
            )
        } else {
            post.likedBy.push(userId)
        }

        await post.save()

        res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: post.likedBy.length
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to toggle like',
            error: err.message
        })
    }
}

module.exports = toggleLike