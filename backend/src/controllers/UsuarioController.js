const connection = require('../database/connection')
const bcrypt = require('bcrypt');
const encrypt = require('./PasswordController');
const generateUniqueId = require('../utils/generateUniqueId');
const forgotPasswordSendMail = require('../utils/forgotPasswordSendMail');

module.exports = {

    async index(request, response){
        const usuarios = await connection('usuario').select('*');
        return response.json(usuarios)
    },

    async forgotPassword(request, response){

        const { email } = request.body;
        const usuario = await connection('usuario')
            .where('email', email)
            .select('*')
            .first();

        if(usuario == undefined){
            return response.status(401).send('Email não cadastrado, tente novamente.');
        }

        const senha = generateUniqueId();

        //ENCRIPTANDO A SENHA
        const salt = encrypt.getSalt();
        const senhaEncriptada = bcrypt.hashSync(senha, salt);

        if(forgotPasswordSendMail(email, senha, usuario.nomeUsuario)){
            await connection('usuario').where('email', email).update('senha', senhaEncriptada);
            return response.json({message: 'Uma nova senha foi enviada para o seu email.'});
        }

        return response.status(400).send('Não foi possível enviar uma nova senha, tente novamente.');
    },

    async create(request, response){
        var {nome, dataNasc, peso, sexo, tipoSang, nomeUsuario, email, senha} = request.body;

        //VERIFICA A EXISTENCIA DO USERNAME OU EMAIL
        const username = await connection('usuario')
            .where('nomeUsuario', nomeUsuario)
            .select('nomeUsuario')
            .first();
        
        const userEmail = await connection('usuario')
            .where('email', email)
            .select('email')
            .first();

        if(username)
            return response.status(400).send('Este nome de usuário já está em uso.');

        if(userEmail)
            return response.status(400).send('Este email já está cadastrado no sistema.');
        

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