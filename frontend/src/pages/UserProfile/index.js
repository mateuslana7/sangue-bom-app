import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';

import api from '../../services/api';


export default function UserProfile(props){

    const history = useHistory();
    const usuarioId = localStorage.getItem('usuarioId');
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        api.get('perfil',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            response.data[0].dataNasc = new Date(response.data[0].dataNasc+" EDT");
            setUsuario(response.data[0]);
        })
    },[usuarioId]);

    async function handleEditUserProfile(){
        try {
                const response = await api.get('perfil', {
                headers: {
                    Authorization: usuarioId,
                }
            });
            history.push({
                pathname: '/perfil/editar',
                state: { detail: response.data[0] }
            });
        } catch (err) {
            swal('Erro', 'Falha ao editar perfil!', 'error');
        }
    }

    return ( 
        <Modal {...props} dialogClassName="custom-dialog" centered>
            <Modal.Header closeButton>
                <Modal.Title><h4>Perfil de Usuário</h4></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <p><b>Nome: </b>{usuario.nome}</p>
                    <p><b>Data de Nascimento: </b>{Intl.DateTimeFormat('pt-BR').format(usuario.dataNasc)}</p>
                    <p><b>Peso: </b>{usuario.peso}</p>
                    <p><b>Tipo Sanguíneo: </b>{usuario.tipoSang}</p>
                    <p><b>Nome de Usuário: </b>{usuario.nomeUsuario}</p>
                    <p><b>Email: </b>{usuario.email}</p>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Fechar</Button>
                <Button variant="danger" onClick={handleEditUserProfile}>Editar</Button>
            </Modal.Footer>
        </Modal>
    )
}