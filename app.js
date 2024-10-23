const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

const router = require('./routes')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
