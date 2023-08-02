'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Items, {
        sourceKey: 'id',
        foreignKey: 'optionId',
      });
    }
  }
  Options.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      extraPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      shotPrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      hot: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
      modelName: 'Options',
    }
  );
  return Options;
};
