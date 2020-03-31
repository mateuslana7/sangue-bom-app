const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usuario_id = request.headers.authorization;

        const usuario = await connection('usuario')
            .where('id', usuario_id)
            .select('nome', 'dataNasc', 'peso', 'tipoSang', 'nomeUsuario');

        return response.json(usuario);
    },

    async listExams(request, response) {
        const usuario_id = request.headers.authorization;

        const exames = await connection('exame')
            .where('usuario_id', usuario_id)
            .select('*');
        
        return response.json(exames); 
    }
}