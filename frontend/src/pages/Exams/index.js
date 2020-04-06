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
                    exame.dataExame = new Date(exame.dataExame);
                    return true;
                })
                setExames(response.data);
            }
            else {
                swal({
                    text: "Você ainda não tem exames cadastrados!",
                    icon: "info",
                }).then(async (confirm) => {
                    if (confirm) {
                        history.push('/inicio');
                    }
                });
            }
        })
    },[usuarioId]);

    async function handleDeleteExam(id){
        try {
            await api.delete(`exames/${id}`,{
                headers: {
                    Authorization: usuarioId,
                }
            });
            swal("Pronto! Este exame foi deletado!", {
                icon: "success",
            });
            setExames(exames.filter(exame => exame.id !== id));
        } catch (err) {
            swal({
                title: "Erro!",
                text: "Falha ao deletar exame, tente novamente.",
                icon: "error",
                dangerMode: true
            })
        }
    }

    async function handleEditExam(id){
        try {
            const response = await api.get(`exames/${id}`, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            console.log(response.data);
        } catch (err) {
            alert('Erro ao obter exame!');
        }
    }

    return (
        <div>
            <Header />
            <div className="exams-container">
                <div className="middle-box middle-box-exams exams-screen">
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
                                            <Link onClick={() => handleEditExam(exame.id)} to="/exames/editar">
                                                <button className="button-edit">
                                                    <FaPencilAlt size={18} color="#fff"></FaPencilAlt>
                                                </button>
                                            </Link>
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