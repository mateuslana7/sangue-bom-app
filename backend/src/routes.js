const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const ExameController = require('./controllers/ExameController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', UsuarioController.create);
routes.put('/usuario', UsuarioController.forgotPassword);

routes.get('/exames', PerfilController.listExams);
routes.get('/perfil', PerfilController.index);
routes.put('/perfil', PerfilController.edit);
routes.delete('/perfil', PerfilController.delete);
routes.put('/alterar-senha', PerfilController.changePassword);

routes.get('/todos-exames', ExameController.index);
routes.post('/exames', ExameController.create);
routes.delete('/exames/:id', ExameController.delete);
routes.put('/exames/:id', ExameController.edit)
routes.get('/exames/:id', ExameController.examById);

module.exports = routes;