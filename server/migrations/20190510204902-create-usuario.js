'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: true,
        type: Sequelize.STRING
      },
      correo: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      contraseña: {
        allowNull: false,
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      tipo_usuario:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuarios');
  }
};