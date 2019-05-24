const express = require("express")
const usuario= express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const Usuario= require("../models/usuario")
usuario.use(cors())
process.env.SECRET_KEY = 'secret'


///registar
usuario.post('/registar', (req, res) =>{
    const today = new Date()
    const usuarioData={
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
    }).then(usuario =>{
        if(!usuario){
            const hash = bcrypt.hashSync(usuarioData.contraseña,10)
            usuarioData.contraseña = hash
            ususario.create(usuarioData).then (ususario =>{
                let token = jwt.sign(ususario.dataValues, process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.json({token:token})
            })
            .catch(err =>{
                res.send('error:' + err)
            })  
        }else{
            res.json({error: 'usuario exite'})
        }
    }).catch(err => {
        res.send('error' + err)
    })
})
//login 
usuario.post('/login', (req,res) =>{
    usuario.findOne({
        where:{
            correo: req.body.correo
        }
    }).then(usuario =>{
        if(bcrypt.compareSync(req.body.contraseña, ususario.contraseña)){
            let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY,{
                expiresIn: 1440
            })
            res.json({token: token})
        }else{
            res.send('el usuario no exixte')
        }
    }).catch(err =>{
        res.send('error' + err)
    })
})
//perfil
usuario.get('/perfil', (req, res) =>{
    var decoded = jwt.verify(req.headers['authorization'], process.evn.SECRET_KEY)
    Usuario.findOne({
        where:{
            id:decoded.id
        }
    }).then(usuario =>{
        if(usuario){
            res.json(usuario)
        }else{
            res.send('el usuario no existe')
        }
    }).catch(err =>{
        res.send('error:' + err)
    })
})

module.exports = usuario