const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res) => {
  res.redirect('/restaurants')
})

router.get('/register', (req, res) => {
  return res.render('register')
})

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }

    req.flash('success', '登出成功！')
    return res.redirect('/login')
  })
})

module.exports = router
