const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res) => {
  const keyword = req.query.keyword?.trim()

  return Restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurant = keyword
        ? restaurants.filter((restaurant) =>
          Object.keys(restaurant).some((property) => {
            if (property === 'name' || property === 'name_en' || property === 'category') {
              return restaurant[property].toLowerCase().includes(keyword.toLowerCase())
            }
            return false
          })
        )
        : restaurants
      res.render('index', { restaurants: matchedRestaurant, keyword })
    })
    .catch((err) => console.log(err))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const body = req.body

  if (!body.name || !body.category) {
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

router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((err) => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => console.log(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if (!body.name || !body.category) {
    return Restaurant.findByPk(id, {
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      raw: true
    })
      .then((restaurant) => res.render('edit', {
        restaurant,
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
  }, { where: { id } })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.destroy({ where: { id } })
    .then(() => res.redirect('/restaurants'))
    .catch((err) => console.log(err))
})

module.exports = router