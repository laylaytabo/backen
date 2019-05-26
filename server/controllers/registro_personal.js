import model from '../models';

const { Registro_personal } = model;
class Registro {
    
    static reg_personal(req, res) {

        Registro_personal.findAll({
            where:{
                ci:req.body.ci
            },
        }).then((ci)=>{
            if(ci !=""){
                res.status(400).json({
                    success:false,
                    message: "ya existe el personal"
                })
            }else{
             const { nombre,apellidop,apellidom,ci,cargo,direcion,telefono} = req.body
             return Registro_personal
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
        return Registro_personal                
        .findAll()
        .then(data => res.status(200).send(data));                       
        }
        
        static OnlyPersonal(req,res){
            var id = req.params.id;  
            Registro_personal.findAll({
               where: {id: id}
               //attributes: ['id', ['description', 'descripcion']]
             }).then((data) => {
               res.status(200).json(data);
             });   
        }
        static updatePersonal(req, res) {
            const { nombre,apellidop,apellidom,ci,cargo,direcion,telefono } = req.body
            return Registro_personal
              .findByPk(req.params.id)
              .then((data) => {
                data.update({
                    nombre: nombre || data.nombre,
                    apellidop: apellidop || data.apellidop,
                    apellidom: apellidom || data.apellidom,
                    ci: ci || data.ci,
                    cargo: cargo || data.cargo,
                    direcion: direcion || data.direcion,
                    telefono: telefono || data.telefono                                          
                })
                .then(update => {
                  res.status(200).send({
                    message: 'Sala actualizado',
                    data: {
                      
                        nombre: nombre || update.nombre,
                    apellidop: apellidop || update.apellidop,
                    apellidom: apellidom || update.apellidom,
                    ci: ci || update.ci,
                    cargo: cargo || update.cargo,
                    direcion: direcion || update.direcion,
                    telefono: telefono || update.telefono  
                    }
                  })
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          }
    }
    export default Registro;