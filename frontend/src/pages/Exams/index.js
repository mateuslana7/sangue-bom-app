import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt, FaSort } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

// import EditExam from '../NewExam';
import Header from '../shared/Header';

import './styles.css';

export default function Exams(){
    const [exames, setExames] = useState([]);

    const usuarioId = localStorage.getItem('usuarioId');

    useEffect(() => {
        api.get('exames',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            setExames(response.data);
        })
    },[usuarioId]);

    async function handleDeleteExam(id){
        try {
            await api.delete(`exames/${id}`,{
                headers: {
                    Authorization: usuarioId,
                }
            });
            setExames(exames.filter(exame => exame.id !== id));
        } catch (err) {
            alert('Erro ao deletar exame, tente novamente.')
        }
    }

    return (
        <div className="exams-container">
            <Header />
            <div className="middle-box middle-box-exams exams-screen">
                <div className="scroll">    
                    <table className="table table-striped table-bordered table-sm">
                        <thead>
                            <tr>
                            <th>Data Exame <a><FaSort/></a></th>
                            <th>Nível de HDL <a><FaSort/></a></th>
                            <th>Nível de LDL <a><FaSort/></a></th>
                            <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exames.map(exame => (
                                <tr key={exame.id}>
                                <th>{exame.dataExame}</th>
                                <td>{exame.valorHdl}</td>
                                <td>{exame.valorLdl}</td>
                                <td>
                                    <div className="button-group">
                                        <Link to="/exames/editar">
                                            <button className="button-edit">
                                                <FaPencilAlt size={18} color="#fff"></FaPencilAlt>
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteExam(exame.id)} className="button-delete">
                                            <FaTrashAlt size={18} color="#fff"></FaTrashAlt>
                                        </button>
                                    </div>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-12 col-lg-6">
                    <Link to="/inicio">
                        <button className="exams-button-back">VOLTAR</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}