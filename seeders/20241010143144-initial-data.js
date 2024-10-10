'use strict';

const restaurants = require('../public/jsons/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', restaurants.map((restaurant) => 
      ({
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      ) 
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null)
  }
};
