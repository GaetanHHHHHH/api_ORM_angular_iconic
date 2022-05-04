'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Agence.belongsToMany(models.Destination, {through: 'Agence_Destination'});
    }
  }
  Agence.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    localization: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Agence',
  });
  return Agence;
};