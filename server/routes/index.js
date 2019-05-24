import Usuarios from '../controllers/usuario';


export default (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BookStore API!',
  }));

  app.post('/api/user', Usuarios.registar); // API route for user to signup
  app.post('/api/login', Usuarios.login);
  
};