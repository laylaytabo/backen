import Usuarios from '../controllers/usuario';
import Registro from '../controllers/registro_personal';



export default (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BookStore API!',
  }));

  //reg_personal
  app.post('/api/personal', Registro.reg_personal);
  app.get('/api/personal', Registro.getRegistro);
  app.get('/api/OnlyPersonal/:id', Registro.OnlyPersonal);
  app.post('/api/updatePersonal/:id', Registro.updatePersonal)
  //usuarios
  app.post('/api/userCuenta/:idReg_personal', Usuarios.registar); // API route for user to signup
  app.get('/api/mostrarCuentas/:id', Usuarios.onlyCuenta);
  app.post('/api/login', Usuarios.login);
  
};