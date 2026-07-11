require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/database')
const logger = require('./src/middleware/logger.middleware')
const authRoutes = require('./src/routes/auth.routes')
const postRoutes = require('./src/routes/post.routes')

const app = express()
const PORT = process.env.PORT || 5000

// Global middleware
app.use(express.json({ limit: '10mb' }))  // increased limit for base64 images
app.use(logger)

// CORS - allows frontend to talk to backend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

// 404 fallback
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.url} not found`
    })
})

async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
            console.log(`Environment: ${process.env.NODE_ENV}`)
        })
    } catch (err) {
        console.log('Failed to start server:', err.message)
        process.exit(1)
    }
}

startServer()