'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cadastros extends Model {
    static associate(models) {

    }
  };
  Cadastros.init({
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cadastros',
  });
  return Cadastros;
};