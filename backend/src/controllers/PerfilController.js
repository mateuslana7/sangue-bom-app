const connection = require('../database/connection');
const encrypt = require('./PasswordController');
const bcrypt = require('bcrypt');

module.exports = {
    async index(request, response) {
        const usuario_id = request.headers.authorization;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('*');

        return response.json(usuario);
    },

    async listExams(request, response) {
        const usuario_id = request.headers.authorization;

        const exames = await connection('exame')
            .where('usuario_id', usuario_id)
            .select('id','dataExame', 'valorHdl', 'valorLdl', 'consultorio');
        
        return response.json(exames); 
    },

    async edit(request, response){
        const usuario_id = request.headers.authorization;
        const {nome, dataNasc, peso, sexo, tipoSang, nomeUsuario, email} = request.body;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('id','nome', 'dataNasc', 'peso', 'sexo', 'tipoSang', 'nomeUsuario', 'email')
            .first();
    
        if(usuario.id !== usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        //MELHORAR DEPOIS
        if(usuario.nome !== nome)
            await connection('usuario').where('id', usuario_id).update('nome', nome);
        if(usuario.dataNasc !== dataNasc)
            await connection('usuario').where('id', usuario_id).update('dataNasc', dataNasc);
        if(usuario.peso !== peso)
            await connection('usuario').where('id', usuario_id).update('peso', peso);
        if(usuario.sexo !== sexo)
            await connection('usuario').where('id', usuario_id).update('sexo', sexo);
        if(usuario.tipoSang !== tipoSang)
            await connection('usuario').where('id', usuario_id).update('tipoSang', tipoSang);
        if(usuario.nomeUsuario !== nomeUsuario)
            await connection('usuario').where('id', usuario_id).update('nomeUsuario', nomeUsuario);
        if(usuario.email !== email)
            await connection('usuario').where('id', usuario_id).update('email', email);

        return response.status(204).send();
    },

    async delete(request, response){
        const usuario_id = request.headers.authorization;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('id')
            .first();
        
        if(usuario.id !== usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        //DELETA O USUARIO E TODOS OS EXAMES CADASTRADOS POR ELE
        await connection('usuario').where('id', usuario_id).delete();
        await connection('exame').where('usuario_id', usuario_id).select('*').delete();

        return response.status(204).send();
    },

    async changePassword(request, response){
        const usuario_id = request.headers.authorization;
        var { senhaAtual, novaSenha } = request.body;

        //ENCRIPTANDO A SENHA
        const salt = encrypt.getSalt();
        senhaAtual = bcrypt.hashSync(senhaAtual, salt);
        novaSenha = bcrypt.hashSync(novaSenha, salt);

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('id', 'senha')
            .first();

        if(usuario.id !== usuario_id || usuario.senha !== senhaAtual){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('usuario').where('id', usuario_id).update('senha', novaSenha);

        return response.json({msg: 'Senha alterada com sucesso!'});
    }
}