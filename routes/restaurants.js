const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

router.get('/', (req, res, next) => {
  const keyword = req.query.keyword?.trim()
  const page = parseInt(req.query.page) || 1
  const limit = 6
  const sortBy = req.query.sort || 'default'

  let sortOptions = []
  switch (sortBy) {
    case 'A->Z':
      sortOptions.push(['name_en', 'ASC'])
      break
    case 'Z->A':
      sortOptions.push(['name_en', 'DESC'])
      break
    case '類別':
      sortOptions.push(['category', 'ASC'])
      break
    case '地區':
      sortOptions.push(['location', 'ASC'])
      break
    default:
      sortOptions = []
  }

  return Restaurant.findAll({
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    offset: (page - 1) * limit,
    limit,
    order: sortOptions,
    raw: true
  })
    .then((restaurants) => {
      const matchedRestaurant = keyword
        ? restaurants.filter((restaurant) =>
          ['name', 'name_en', 'category'].some((property) =>
            restaurant[property].toLowerCase().includes(keyword.toLowerCase())
          )
        )
        : restaurants

      res.render('index', {
        restaurants: matchedRestaurant,
        keyword,
        sortBy,
        prev: page > 1 ? page - 1 : page,
        next: page + 1,
        page
      })
    })
    .catch((error) => {
      error.errorMessage = '資料取得失敗：（'
      next(error)
    })
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res, next) => {
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
    .then(() => {
      req.flash('success', '新增成功！')
      return res.redirect('/restaurants')
    })
    .catch((error) => {
      error.errorMessage = '新增失敗：（'
      next(error)
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => {
      error.errorMessage = '資料取得失敗：（'
      next(error)
    })
})

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id

  return Restaurant.findByPk(id, {
    attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => {
      error.errorMessage = '資料取得失敗：（'
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
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
    .then(() => {
      req.flash('success', '編輯成功！')
      return res.redirect(`/restaurants/${id}`)
    })
    .catch((error) => {
      error.errorMessage = '編輯失敗：（'
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  return Restaurant.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除成功！')
      return res.redirect('/restaurants')
    })
    .catch((error) => {
      error.errorMessage = '刪除失敗：（'
      next(error)
    })
})

module.exports = router
