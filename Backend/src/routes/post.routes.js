const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/auth.middleware')

const getAllPosts = require('../controllers/posts/getAllPosts')
const getPostBySlug = require('../controllers/posts/getPostBySlug')
const createPost = require('../controllers/posts/createPost')
const updatePost = require('../controllers/posts/updatePost')
const deletePost = require('../controllers/posts/deletePost')
const getMyPost = require('../controllers/posts/getMyPost')
const toggleLike = require('../controllers/posts/toggleLike')
const getLikedPosts = require('../controllers/posts/getLikedPosts')

// public routes
router.get('/', getAllPosts)
router.get('/my-posts', requireAuth, getMyPost)
router.get('/liked', requireAuth, getLikedPosts)
router.get('/:slug', getPostBySlug)

// protected routes
router.post('/', requireAuth, createPost)
router.put('/:id', requireAuth, updatePost)
router.delete('/:id', requireAuth, deletePost)
router.post('/:id/like', requireAuth, toggleLike)

module.exports = router