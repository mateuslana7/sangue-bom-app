const connection = require('../database/connection')
const bcrypt = require('bcrypt');
const encrypt = require('./PasswordController');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async index(request, response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios)
    },

    async create(request, response){
        var {nome, dataNasc, peso, sexo, tipoSang, nomeUsuario, email, senha} = request.body;

        //CRIPTOGRAFIA DA SENHA 
        const salt = encrypt.getSalt();
        senha = bcrypt.hashSync(senha, salt)

        //GERANDO O ID DO USUARIO
        const id = generateUniqueId();

        await connection('usuario').insert({
            id,
            nome, 
            dataNasc, 
            peso, 
            sexo, 
            tipoSang, 
            nomeUsuario, 
            email, 
            senha
        })
        return response.json({status: 'Cadastro realizado com sucesso!'});
    }
}