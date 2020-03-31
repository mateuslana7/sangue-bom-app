const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { dataExame, valorHdl, valorLdl, consultorio } = request.body;
        const usuario_id = request.headers.authorization;

        const [id] = await connection('exame').insert({
            dataExame, 
            valorHdl, 
            valorLdl, 
            consultorio,
            usuario_id
        })

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const exame = await connection('exame')
            .where('id', id)
            .select('usuario_id')
            .first();
        
        if(exame.usuario_id !== usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('exame').where('id', id).delete();

        return response.status(204).send();
        
    }
};