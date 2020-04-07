import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaPencilAlt, FaSort } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../../services/api';

// import EditExam from '../NewExam';
import Header from '../shared/Header';

import './styles.css';

export default function Exams(){
    const [exames, setExames] = useState([]);
    const usuarioId = localStorage.getItem('usuarioId');
    const history = useHistory();

    async function deleteAlert(id){
        swal({
            title: "Atenção",
            text: "Você tem certeza que deseja deletar este exame ?",
            icon: "warning",
            buttons: ["Cancelar", "Confirmar"],
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              await handleDeleteExam(id);
            }
        });
    }

    useEffect(() => {
        api.get('exames',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            if(response.data.length > 0){
                response.data.map(exame => {
                    exame.dataExame = new Date(exame.dataExame+" EDT");
                    return true;
                })
                setExames(response.data);
            }
            else {
                history.push('/inicio');
                swal("","Você ainda não tem exames cadastrados!","info");
            }
        })
    },);

    async function handleDeleteExam(id){
        try {
            await api.delete(`exames/${id}`,{
                headers: {
                    Authorization: usuarioId,
                }
            });
            swal("", "Pronto! Este exame foi deletado!", "success");
            setExames(exames.filter(exame => exame.id !== id));
        } catch (err) {
            swal("Erro!", "Falha ao deletar exame, tente novamente.", "error");
        }
    }

    async function handleEditExam(id){
        try {
                const response = await api.get(`exames/${id}`, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            history.push({
                pathname: '/exames/editar',
                state: { detail: response.data }
            });
        } catch (err) {
            swal('Erro', 'Falha ao editar exame!', 'error');
        }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="tab-img tab-position-exams"><div className="tab-text">Exames</div></div>
                <div className="middle-box exams-screen">
                    <div className="scroll">    
                        <table className="table table-striped table-bordered table-sm table-secondary">
                            <thead>
                                <tr>
                                <th>Data Exame <FaSort/></th>
                                <th>Nível de HDL <FaSort/></th> 
                                <th>Nível de LDL <FaSort/></th> 
                                <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exames.map(exame => (
                                    <tr key={exame.id}>
                                    <td>{Intl.DateTimeFormat('pt-BR').format(exame.dataExame)}</td>
                                    <td>{exame.valorHdl}</td>
                                    <td>{exame.valorLdl}</td>
                                    <td>
                                        <div className="button-group">
                                            <button className="button-edit" onClick={() => handleEditExam(exame.id)}>
                                                <FaPencilAlt size={18} color="#fff"></FaPencilAlt>
                                            </button>
                                            <button onClick={() => deleteAlert(exame.id)} className="button-delete">
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
        </div>
    )
}