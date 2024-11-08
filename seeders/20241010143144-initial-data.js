'use strict'
const bcrypt = require('bcryptjs')
const restaurants = require('../public/jsons/restaurant.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction

    try {
      transaction = await queryInterface.sequelize.transaction()

      const hash = await bcrypt.hash('12345678', 10)

      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          name: 'user1',
          email: 'user1@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: 2,
          name: 'user2',
          email: 'user2@example.com',
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }], { transaction }
      )
      await queryInterface.bulkInsert('Restaurants', restaurants.map((restaurant, i) => {
        const userId = i < 4 ? 1 : 2
        return {
          ...restaurant,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId
        }
      }), { transaction }
      )

      await transaction.commit()
    } catch (error) {
      console.log(error)
      if (transaction) await transaction.rollback()
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
