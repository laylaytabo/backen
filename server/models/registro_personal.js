'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registro_personal = sequelize.define('Registro_personal', {
    nombre: DataTypes.TEXT,
    apellidop: DataTypes.TEXT,
    apellidom: DataTypes.TEXT,
    ci: {
      type: DataTypes.STRING,
      unique: {
        args: true
      },
    },
    cargo: DataTypes.TEXT,
    direcion: DataTypes.TEXT,
    telefono: DataTypes.INTEGER
  }, {});
  Registro_personal.associate = function(models) {
    // associations can be defined here
    Registro_personal.hasMany(models.Usuario, {
      foreignKey: 'idReg_personal',
    });
  };
  return Registro_personal;
};