import model from '../models';
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from"bcrypt";
//const usuario= expr
const { Usuario } = model;
//Usuario.use(cors());
process.env.SECRET_KEY = 'secret';

class Usuarios {
  
  static registar(req, res) {    
    Usuario.findAll({
      where:{correo : req.body.correo},
    }).then((correo)=> {
      //res.status(200).send(correo)
      if(correo != ""){
        res.status(200).send("ya existe el correo")
      }else{
        const { nombre, correo, contraseña, estado, tipo_usuario } = req.body
        const { idReg_personal } = req.params
      return Usuario
        .create({
          nombre,
          correo,
          contraseña,
          estado,
          tipo_usuario,
          idReg_personal
        })
        .then(usuarioData => res.status(201).send({
          success: true,
          message: 'Usuario creado correctamente',
          usuarioData
        }))
        .catch(error => res.status(400).send(error.message));
      }

    })
    
    } 
    static login(req,res){
      Usuario.findAll({
        where:{correo : req.body.correo, contraseña : req.body.contraseña},
      }).then ((login) =>{
        if(login == ""){
          res.status(200).send({
            success: false,
          })
        }else{ if(login[0].contraseña == req.body.contraseña){
          res.status(200).send({
            success: true,
          })  
         }
        }
      })
    }
    //servico para mostrar las cuentas o cuenta del usraio
    static onlyCuenta(req, res){                
      var id = req.params.id;  
      Usuario.findAll({
         where: {idReg_personal: id}
         //attributes: ['id', ['description', 'descripcion']]
       }).then((data) => {
         res.status(200).json(data);
      });     
    }
}

export default Usuarios;

    /*const usuarioData={
      nombre: req.body.nombre,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        estado: req.body.estado,
        tipo_usuario: req.body.tipo_usuario,
        created: today
    }
    
    Usuario.findOne({
      where:{
        correo:req.body.correo
      }
    }).then(Usuario =>{
      if(!Usuario){
        const hash = bcrypt.hashSync(usuarioData.contraseña,10)
        usuarioData.contraseña= hash
        return UsuarioUsuario.create(usuarioData).then(Usuario =>{
          let token= jwt.sign(Usuario.dataValues, process.env.SECRET_KEY,{
            expiresIn:1440
          })
          res.json({token:token})
        })  .catch(err =>{
          res.send('error:' + err)
      }) 
      }else{
        res.json({error: 'usuario exite'})
      }
    }).catch(err => {
      res.send('error' + err)
    })

    */