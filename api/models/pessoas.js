'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {

    }
  };
  Pessoas.init({
    nome: DataTypes.STRING,
    genero: DataTypes.ENUM('masculino', 'feminino','outro'),
    pais: DataTypes.STRING,
    idade: DataTypes.STRING,
    frase: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};