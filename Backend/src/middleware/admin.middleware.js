// admin.middleware.js
const requireAdmin = (req, res, next) => {
    // req.user already attached by requireAuth
    const adminEmails = process.env.ADMIN_EMAILS
        ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase())
        : []

    if (!adminEmails.includes(req.user.email.toLowerCase())) {
        return res.status(403).json({
            success: false,
            message: 'Admin access only'
        })
    }

    next()
}

module.exports = requireAdmin