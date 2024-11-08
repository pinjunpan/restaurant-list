const express = require('express')
const router = express.Router()

const root = require('./root')
const oauth = require('./oauth')
const restaurants = require('./restaurants')
const users = require('./users')
const authHandler = require('../middlewares/auth-handler')

router.use('/', root)
router.use('/oauth', oauth)
router.use('/restaurants', authHandler, restaurants)
router.use('/users', users)

module.exports = router