'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'ad2f6f78-6172-4c6d-969c-3adc3d9032d5',
        user_name: 'Victor',
        account_id: 'd8723224-e445-4ccc-aeb3-a4ad55462c84',
        password: '$2a$10$k5Vw.FdvWOsK1ELnRlTjOu75IGeLdfcK04KcGOx.oO/8A77EBrb5K' // 123456
      },
      {
        id: 'e3ffbca9-13e3-4e37-8d85-5c3cd581215a',
        user_name: 'Erick',
        account_id: '23a5999d-dbfc-4960-ac4d-9ec2b91a302c',
        password: '$2a$10$zifBA5/5u6QTs3laFa30LOhXTJyobb.c9FEgPxXfm9Ps5NTuuFEGW' // 654321
      },
      {
        id: 'e5a99a6c-5768-4f7a-babe-6245e8abef6d',
        user_name: 'Thauler',
        account_id: '88ac8439-1c23-4902-b11a-534cf0411d91',
        password: '$2a$10$ZAbVHpeB49fv4b8Js5Vbb.3YbuP5HPgybLCM/0HU.YhjItW0GHcFa' // 111111
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
