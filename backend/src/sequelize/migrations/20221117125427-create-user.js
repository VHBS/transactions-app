'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userName: {
        type: Sequelize.STRING,
        field: 'user_name',
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Accounts',
          key: 'id'
        },
        field: 'account_id'
      }
    },
    {
      underscored: true,
      timestamps: false
    })
  },
  async down (queryInterface) {
    await queryInterface.dropTable('Users')
  }
}
