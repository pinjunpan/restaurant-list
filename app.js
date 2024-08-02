const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim()
  const matchedRestaurant = keyword?restaurants.filter((restaurant) => 
    Object.keys(restaurant).some((property) => {
      if(property === 'name' || property === 'name_en' || property === 'category'){
        return restaurant[property].toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    }) 
  ) :restaurants
  res.render('index', {restaurants: matchedRestaurant, keyword})
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('detail', {restaurant})
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})