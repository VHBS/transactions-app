'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Accounts', [
      {
        id: 'd8723224-e445-4ccc-aeb3-a4ad55462c84',
        balance: 10000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '23a5999d-dbfc-4960-ac4d-9ec2b91a302c',
        balance: 20000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '88ac8439-1c23-4902-b11a-534cf0411d91',
        balance: 30000,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Accounts', null, {})
  }
}
