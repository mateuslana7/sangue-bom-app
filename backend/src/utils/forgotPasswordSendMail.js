const nodemailer = require('nodemailer');
const account = require('../config.json')

var u = account.user;
var p = account.pass;

module.exports = async function forgotPasswordSendMail(email, newPassword, username){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, 
        auth: {
            user: u,
            pass: p
        }
    });

    var mailOptions = {
        from: 'contato.sanguebom.app@gmail.com', 
        to: email, 
        subject: 'Sangue Bom - Nova Senha de Acesso ', 
        text: 'Seus novos dados de acesso estão abaixo.\n'+'Nome de Usuário: '+username+'\n'+'Senha: '+newPassword, 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return false;
        }

        console.log('Message sent: ' + info.response);
        return true;
    });
}