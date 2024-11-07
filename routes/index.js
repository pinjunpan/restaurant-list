const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const users = require('./users')

router.use('/restaurants', restaurants)
router.use('/users', users)

router.get('/', (req, res) => {
  res.redirect('/login')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', (req, res) => {
  return res.send(req.body)
})

router.get('/logout', (req, res) => {
  return res.send('logout')
})

module.exports = router
