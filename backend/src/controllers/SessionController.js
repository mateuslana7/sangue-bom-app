const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { nomeUsuario, senha } = request.body;

        const usuario = await connection('usuario')
            .where('nomeUsuario', nomeUsuario)
            .where('senha', senha)
            .select('nome')
            .first();

        if(!usuario){
            return response.status(400).json({error: 'Incorrect username or password'});
        }

        return response.json(usuario);
    }
}