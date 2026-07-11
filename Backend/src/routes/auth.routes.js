const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/auth.middleware')

const signup = require('../controllers/auth/signup')
const login = require('../controllers/auth/login')
const generateOtp = require('../controllers/auth/generateOtp')
const verifyOtp = require('../controllers/auth/verifyOtp')
const updatePassword = require('../controllers/auth/updatePassword')
const forgotPassword = require('../controllers/auth/forgot-password')
const resetPassword = require('../controllers/auth/reset-password')

// public routes
router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-otp', verifyOtp)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

// protected routes
router.get('/generate-otp', requireAuth, generateOtp)
router.put('/update-password', requireAuth, updatePassword)

module.exports = router
