'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      balance: {
        type: Sequelize.INTEGER,
        defaultValue: 10000
      }
    },
    {
      underscored: true,
      timestamps: false
    })
  },
  async down (queryInterface) {
    await queryInterface.dropTable('Accounts')
  }
}
