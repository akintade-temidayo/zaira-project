const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/auth.middleware')
const requireAdmin = require('../middleware/admin.middleware')

const getStats = require('../controllers/admin/getStats')
const getAllUsers = require('../controllers/admin/getAllUsers')
const disableUser = require('../controllers/admin/disableUser')
const reactivateUser = require('../controllers/admin/reactivateUser')

// all admin routes require a valid token AND isAdmin: true
router.get('/stats', requireAuth, requireAdmin, getStats)
router.get('/users', requireAuth, requireAdmin, getAllUsers)
router.patch('/users/:id/disable', requireAuth, requireAdmin, disableUser)
router.patch('/users/:id/reactivate', requireAuth, requireAdmin, reactivateUser)

module.exports = router