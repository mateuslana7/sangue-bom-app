import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Header from '../shared/Header';
import './styles.css';

import api from '../../services/api'

export default function NewExam(){
    const usuarioId = localStorage.getItem('usuarioId');

    const [consultorio, setConsultorio] = useState('');
    const [dataExame, setDataExame] = useState('');
    const [valorHdl, setValorHdl] = useState(0);
    const [valorLdl, setValorLdl] = useState(0);

    const history = useHistory();
    
    async function handleNewExam(e) {
        e.preventDefault();
        
        const data = {
            consultorio,
            dataExame,
            valorHdl,
            valorLdl,
        };

        try{
            await api.post('exames', data, 
            {
                headers:{
                    Authorization: usuarioId,
                }
            })
            swal({
                title: "Pronto!",
                text: "Exame adicionado com sucesso!",
                icon: "success",
            })
            history.push('/inicio')
        }catch (err){
            alert('Erro ao adicionar exame, tente novamente.')
        }
    }

    return (
        <div className="newexam-container">
            <Header />
            <div className="middle-box newexam-screen">
                <div>
                    <form onSubmit={handleNewExam} className="form-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-lg-12">
                                    <label>INCLUIR DADOS:</label>
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
                                    <Link to="/inicio">
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
    );
}