const mongoose = require('mongoose')
const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Access denied.'
            })
        }

        if (!mongoose.isValidObjectId(token)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format.'
            })
        }

        // token is the user's MongoDB _id
        const user = await User.findById(token)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            })
        }

        // attach user to request so controllers can use it
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Token verification failed'
        })
    }
}

module.exports = requireAuth
