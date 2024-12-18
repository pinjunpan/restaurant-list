const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const helpers = require('./helpers/handlebars-helpers')
const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

const router = require('./routes')
const passport = require('./config/passport')

app.engine('.hbs', engine({ extname: '.hbs', helpers }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
