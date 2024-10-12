const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

const db = require('./models')
const Restaurant = db.Restaurant

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim()

  return Restaurant.findAll({
      attribute: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],  
      raw: true
    })
    .then((restaurants) => {
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
    .catch((err) => console.log(err))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const body = req.body

  if(!body.name || !body.category){
    return res.render('new', {
      errorMessage: 'Name and Category are required fields.'
    })
  }

  return Restaurant.create({
    name: body.name,
    name_en: body.name_en,
    category: body.category,
    image: body.image,
    location: body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description: body.description
  })
    .then(() => res.redirect('/restaurants'))
    .catch((err) => console.log(err))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attribute: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],  
    raw: true
  })
    .then((restaurant) => res.render('detail', {restaurant}))
    .catch((err) => console.log(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attribute: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],  
    raw: true
  })
    .then((restaurant) => res.render('edit', {restaurant}))
    .catch((err) => console.log(err))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if(!body.name || !body.category){
    return Restaurant.findByPk(id, {
      attribute: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],  
      raw: true
    })
      .then((restaurant) => res.render('edit', {restaurant,
        errorMessage: 'Name and Category are required fields.'
      }))
  }

  return Restaurant.update({
    name: body.name,
    name_en: body.name_en,
    category: body.category,
    image: body.image,
    location: body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description: body.description
  }, {where: {id}})
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.destroy({where: {id}})
    .then(() => res.redirect('/restaurants'))
    .catch((err) => console.log(err))
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})