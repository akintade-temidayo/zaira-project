const mongoose = require('mongoose')
const slugify = require('slugify')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    recipe: {
        type: String,
        required: [true, 'Recipe is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['breakfast', 'lunch', 'dinner'],
            message: 'Category must be breakfast, lunch, or dinner'
        }
    },
    image: {
        type: String,
        default: null
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

postSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('title')) {
        const User = require('./user.model')
        const author = await User.findById(this.author).select('fullName')
        const authorName = author?.fullName || 'user'

        const combined = `${this.title} from ${authorName}`

        this.slug = slugify(combined, {
            lower: true,
            strict: true,
            trim: true
        })

        const existingPost = await mongoose.model('Post').findOne({
            slug: this.slug,
            _id: { $ne: this._id }
        })

        if (existingPost) {
            this.slug = `${this.slug}-${Date.now()}`
        }
    }
    // next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post