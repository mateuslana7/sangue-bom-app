import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

import Header from '../shared/Header';
// import './styles.css';

import api from '../../services/api'

export default function NewExam(){
    const usuarioId = localStorage.getItem('usuarioId');

    const history = useHistory();
    const location = useLocation();
    
    const obj = (location.state !== undefined) ? location.state.detail : {};
    const formType = (location.state !== undefined) ? 'EDITAR' : 'CADASTRAR';

    const [consultorio, setConsultorio] = useState(obj.consultorio || '');
    const [dataExame, setDataExame] = useState(obj.dataExame || '');
    const [valorHdl, setValorHdl] = useState(obj.valorHdl || 0);
    const [valorLdl, setValorLdl] = useState(obj.valorLdl || 0);
    
    async function handleNewExam(e) {
        e.preventDefault();
        
        const data = {
            consultorio,
            dataExame,
            valorHdl,
            valorLdl,
        };

        try{
            const auth = { headers: {Authorization: usuarioId}};
            var msg = '';
            if(formType === 'CADASTRAR'){
                msg = "Exame adicionado com sucesso!";
                await api.post('exames', data, auth);
            }
            if(formType === 'EDITAR'){
                msg = "Exame editado com sucesso!";
                await api.put(`exames/${obj.id}`, data, auth)
            }
            swal("Pronto!", msg, "success");
            formType === 'cadastrar' ? history.push('/inicio') : history.push('/exames') 
        }catch (err){
            if(formType === 'CADASTRAR')
                msg = 'Falha ao adicionar exame, tente novamente.';
            if(formType === 'EDITAR')
                msg = 'Falha ao editar exame, tente novamente.';
            swal('Erro!', msg, 'error');
        }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="tab-img tab-position-home"><div className="tab-text">Exames</div></div>
                <div className="middle-box home-screen">
                    <div>
                        <form onSubmit={handleNewExam} className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-12">
                                        <label>{formType} DADOS:</label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Consultório:</label>
                                        <input 
                                            className="form-control" 
                                            placeholder="Ex.: Consultório Silva" 
                                            required={true}
                                            value={consultorio}
                                            onChange={e => setConsultorio(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Data do Exame:</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            placeholder="Ex.: João da Silva" 
                                            required={true}
                                            value={dataExame}
                                            onChange={e => setDataExame(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Valor HDL:</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="0" 
                                            required={true}
                                            value={valorHdl}
                                            onChange={e => setValorHdl(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Valor LDL:</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="0" 
                                            required={true} 
                                            value={valorLdl}
                                            onChange={e => setValorLdl(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <Link to={formType === 'CADASTRAR' ? "/inicio" : '/exames'}>
                                            <button className="button-back">VOLTAR</button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <button className="button" type="submit">CONFIRMAR</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}