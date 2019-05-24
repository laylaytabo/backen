import model from '../models';

const { Registro} = model;
class Registro_personal {
    
    static reg_personal(req, res) {

        Registro.findAll({
            where:{
                ci:req.body.ci
            },
        }).then((ci)=>{
            if(ci !=""){
                res.status(200).send("ya existe el personal")
            }else{
             const { nombre,apellidop,apellidom,ci,cargo,direcion,telefono} = req.body
             return Registro
            .create(  {
                 nombre,
                 apellidop,
                 apellidom,
                 ci,
                 cargo,
                 direcion,
                 telefono
          })
           .then(registroData => res.status(201).send({
              success: true,
              message: 'personal registrado',
              registroData
          })).catch(error => res.status(400).send(error.message));
            }
        })
        
       }
    static getRegistro(req, res) {
        return Registro
        .findAll()
        .then(Registro => res.status(200).send(Registro));
     }
    }
    export default Registro_personal;