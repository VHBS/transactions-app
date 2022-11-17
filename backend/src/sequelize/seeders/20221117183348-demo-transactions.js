'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Transactions', [
      {
        id: '9c18b8fa-0e3f-4327-ba04-5812daa9b8a3',
        debited_account_id: '23a5999d-dbfc-4960-ac4d-9ec2b91a302c',
        credited_account_id: '88ac8439-1c23-4902-b11a-534cf0411d91',
        value: 10000,
        created_at: new Date()
      },
      {
        id: 'a9f01ef2-788e-43a6-9e47-960a0e21625c',
        credited_account_id: '23a5999d-dbfc-4960-ac4d-9ec2b91a302c',
        debited_account_id: '88ac8439-1c23-4902-b11a-534cf0411d91',
        value: 20000,
        created_at: new Date()
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Transactions', null, {})
  }
}
