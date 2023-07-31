'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrderCustomers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      orderCustomerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'OrderCustomers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      option: {
        type: Sequelize.JSON,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ItemOrderCustomers');
  },
};
