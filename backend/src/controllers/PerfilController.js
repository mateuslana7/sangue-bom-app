const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usuario_id = request.headers.authorization;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('nome', 'dataNasc', 'peso', 'tipoSang', 'nomeUsuario', 'email');

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
        const {nome, dataNasc, peso, tipoSang, nomeUsuario, email} = request.body;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('id','nome', 'dataNasc', 'peso', 'tipoSang', 'nomeUsuario', 'email')
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

        await connection('usuario').where('id', usuario_id).delete();

        return response.status(204).send();
    }
}