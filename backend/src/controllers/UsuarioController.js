const connection = require('../database/connection')
// const crypto = require('crypto');

module.exports = {

    async index(request, response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios)
    },

    async create(request, response){
        const {id, nome, dataNasc, peso, sexo, tipoSang, nomeUsuario, email, senha} = request.body;

        //FAZER A CRIPTOGRAFIA DA SENHA DPS

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