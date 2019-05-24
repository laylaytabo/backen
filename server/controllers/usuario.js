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
    
    
    Usuario.findAll({
      where:{correo:req.body.correo},
      

    }).then((correo)=> {
      //res.status(200).send(correo)
      if(correo != ""){
        res.status(200).send("ya existe el correo")
      }else{
        const { nombre, correo, contraseña, estado, tipo_usuario } = req.body
      return Usuario
        .create({
          nombre,
          correo,
          contraseña,
          estado,
          tipo_usuario
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
        where:{correo:req.body.correo, contraseña: req.body.contraseña},
      }).then ((login) =>{
        if(login == ""){
          res.status(200).send("este usario  existe")
        }else{ if(login[0].contraseña == req.body.contraseña){
          res.status(200).send("no existe")  
         }
        }
        
         
       
        
      
      })
    }
}

export default Usuarios;