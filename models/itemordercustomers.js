'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Items, {
        targetKey: 'id',
        foreignKey: 'itemId',
      });
      this.belongsTo(models.OrderCustomers, {
        targetKey: 'id',
        foreignKey: 'orderCustomerId',
      });
    }
  }
  ItemOrderCustomers.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Items',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      orderCustomerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'OrderCustomers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      option: {
        type: DataTypes.JSON,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'ItemOrderCustomers',
    }
  );
  return ItemOrderCustomers;
};
