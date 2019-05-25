const bcrypt = require("bcrypt");
export default (sequelize, DataTypes) => {

  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
     
    },
    correo:{
      type: DataTypes.STRING,
      unique: {
        args: true
      },
      validate: {
        isEmail: {
          args: false
        }
      }
    }, 
    contraseña: {
      type:  DataTypes.STRING,
      allowNull:{
        args: false,
      },
      
    
      /*validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('La contraseña Debe tener mas de 12 caracteres');
          }
        },
      }*/
      
      
      
    },
    estado:{
      type: DataTypes.BOOLEAN,
      allowNull:{
        args: false,
      
      }
    }, 
    tipo_usuario:{
      type:  DataTypes.STRING,
      allowNull:{
        args: false,
      }
    },
    idReg_personal: { 
      type: DataTypes.INTEGER,
      allowNull:{
        args: false,
      }
    }
   
  }, {});
  Usuario.beforeSave((usuario, options) => {
    if (usuario.changed('contraseña')) {
      usuario.contraseña = bcrypt.hashSync(usuario.contraseña, bcrypt.genSaltSync(10), null);
    }
  });
  Usuario.prototype.compareContraseña = function (contra, cb) {
    bcrypt.compare(contra, this.contraseña, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };
  Usuario.associate = (models) => {
    // associations can be defined here
    Usuario.belongsTo(models.Registro_personal, {
      foreignKey: 'idReg_personal',
      onDelete: 'CASCADE'
    });
  };
  return Usuario;
};
