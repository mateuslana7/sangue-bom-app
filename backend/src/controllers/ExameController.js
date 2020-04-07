const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const exames = await connection('exame').select('*');
        return response.json(exames)
    },

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

    async examById(request, response){
        const usuario_id = request.headers.authorization;
        const { id } = request.params;

        const exame = await connection('exame')
            .where('id', id)
            .select('id','usuario_id','consultorio', 'dataExame', 'valorHdl', 'valorLdl')
            .first();
        
        if(exame.usuario_id !== usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        return response.json(exame);

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
    },

    async edit(request, response){
        const { dataExame, valorHdl, valorLdl, consultorio } = request.body;
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const exame = await connection('exame')
            .where('id', id)
            .select('*')
            .first();
        
        if(exame.usuario_id !== usuario_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        //MELHORAR DEPOIS
        if(exame.dataExame !== dataExame)
            await connection('exame').where('id', id).update('dataExame', dataExame);
        if(exame.valorHdl !== valorHdl)  
            await connection('exame').where('id', id).update('valorHdl', valorHdl);
        if(exame.valorLdl !== valorLdl)    
            await connection('exame').where('id', id).update('valorLdl', valorLdl);
        if(exame.consultorio !== consultorio)    
            await connection('exame').where('id', id).update('consultorio', consultorio);  


        return response.status(204).send();
        
    }
};