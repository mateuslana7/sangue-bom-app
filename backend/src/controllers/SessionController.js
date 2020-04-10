const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const encrypt = require('./PasswordController');

module.exports = {
    async create(request, response){
        var { nomeUsuario, senha } = request.body;
        
        //ENCRIPTANDO A SENHA
        const salt = encrypt.getSalt();
        senha = bcrypt.hashSync(senha, salt);

        const usuario = await connection('usuario')
	        .where('nomeUsuario', nomeUsuario)
	        .where('senha', senha)
	        .select('nome', 'id')
	        .first();
        
        if(!usuario){
            return response.status(400).send('Usuário e/ou senha incorreto(s), tente novamente.');
        }

        return response.json(usuario);
    }
}