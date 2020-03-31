const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const ExameController = require('./controllers/ExameController');
const PerfilController = require('./controllers/PerfilController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', UsuarioController.create);

routes.get('/perfil', PerfilController.index);

routes.get('/exames', ExameController.index);
routes.post('/exames', ExameController.create);
routes.delete('/exames/:id', ExameController.delete);

module.exports = routes;