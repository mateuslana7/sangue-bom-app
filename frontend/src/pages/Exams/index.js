import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { FaTrashAlt, FaPencilAlt, FaSort } from 'react-icons/fa';
import swal from 'sweetalert';
import Header from '../shared/Header';
import api from '../../services/api';

import './styles.css';

export default function Exams(){
    const [exames, setExames] = useState([]);
    const usuarioId = localStorage.getItem('usuarioId');
    const history = useHistory();

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

    function buttonFormatter(cell, row){
        return ( 
            <div className="button-group">
                <button className="button-edit">
                    <FaPencilAlt size={18} color="#fff" onClick={() => handleEditExam(row['id'])}></FaPencilAlt>
                </button>
                <button className="button-delete">
                    <FaTrashAlt size={18} color="#fff" onClick={() => deleteAlert(row['id'])}></FaTrashAlt>
                </button>
            </div>
        )
    }

    function dateFormatter(cell, row){
        return Intl.DateTimeFormat('pt-BR').format(row['dataExame']);
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="tab-img tab-position-exams"><div className="tab-text">Exames</div></div>
                <div className="middle-box exams-screen">
                        <BootstrapTable className="scroll" data={exames} striped hover height='380'>
                            <TableHeaderColumn dataField='id' isKey dataAlign='center' hidden>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='dataExame' dataFormat={dateFormatter} dataAlign='center' width='25%' dataSort>Data <button className="sort-button"><FaSort/></button></TableHeaderColumn>
                            <TableHeaderColumn dataField='valorHdl' dataAlign='center' width='25%' dataSort>Valor HDL <button className="sort-button"><FaSort/></button></TableHeaderColumn>
                            <TableHeaderColumn dataField='valorLdl' dataAlign='center' dataSort width='25%'>Valor LDL <button className="sort-button"><FaSort/></button></TableHeaderColumn>
                            <TableHeaderColumn dataFormat={buttonFormatter} dataAlign='center' width='25%'>Ação</TableHeaderColumn>
                        </BootstrapTable>
                        <Link to="/inicio"><button className="exams-button-back">VOLTAR</button></Link>
                </div>
            </div>
        </div>
    )
}