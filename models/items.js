'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.OrderItems, {
        sourceKey: 'id',
        foreignKey: 'itemId',
      });
      this.hasMany(models.ItemOrderCustomers, {
        sourceKey: 'id',
        foreignKey: 'itemId',
      });
      this.belongsTo(models.Options, {
        targetKey: 'id',
        foreignKey: 'optionId',
      });
    }
  }
  Items.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      optionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Options',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['coffee', 'juice', 'food'],
      },
      amount: {
        defaultValue: 0,
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
      modelName: 'Items',
    }
  );
  return Items;
};
