const connection = require('../database/connection')
const bcrypt = require('bcrypt');
const encrypt = require('./PasswordController');
const generateUniqueId = require('../utils/generateUniqueId');
const nodemailer = require('nodemailer');
const account = require('../config.json')

var u = account.user;
var p = account.pass;

function forgotPasswordEmail(email, newPassword){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: u,
            pass: p
        }
    });

    var mailOptions = {
        from: 'contato.sanguebom.app@gmail.com', 
        to: email, 
        subject: 'Sangue Bom - Nova Senha de Acesso ', 
        text: 'Sua nova senha de acesso é: '+newPassword, 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }

        console.log('Message sent: ' + info.response);
    });
}

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
            return response.status(401).json({error: 'Email não cadastrado, tente novamente.'});
        }

        const senha = generateUniqueId();

        //ENCRIPTANDO A SENHA
        const salt = encrypt.getSalt();
        const senhaEncriptada = bcrypt.hashSync(senha, salt);

        forgotPasswordEmail(email, senha);
        
        await connection('usuario').where('email', email).update('senha', senhaEncriptada);

        return response.json({message: 'Uma nova senha foi enviada para o seu email.'});
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