import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import { FaPowerOff, FaUser } from 'react-icons/fa'
import swal from 'sweetalert';

import logoImg from '../../../assets/logo.png';

import api from '../../../services/api';

// import UserProfile from '../../UserProfile';//VER DPS COMO FAZER

export default function Header(){   
    const [usuario, setUsuario] = useState([]);

    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const usuarioId = localStorage.getItem('usuarioId');
    const history = useHistory();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api.get('perfil',{
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            response.data[0].dataNasc = new Date(response.data[0].dataNasc);
            setUsuario(response.data[0]);
        })
    },[usuarioId]);

    async function logoutAlert(){
        swal({
            title: "Atenção",
            text: "Você tem certeza que deseja sair ?",
            icon: "warning",
            buttons: ["Cancelar", "Confirmar"],
            dangerMode: true,
          })
          .then(async (willLogout) => {
            if (willLogout) {
              await handleLogout();
            }
        });
    }

    function handleLogout(){

        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="header-style">
            <header>
                <Link to="/inicio"><img className="logo-img" src={logoImg} width="200" alt="Sangue Bom" /></Link>
                <span className="absolute">Bem vindo, {nomeUsuario}</span>    
                <button onClick={handleShow} className="absolute-userprofile grey-button">
                    <FaUser size={18} color="#CF3537"></FaUser>
                </button>
                <button onClick={logoutAlert} type="button">
                    <FaPowerOff size={18} color="#ced4da"></FaPowerOff>
                </button>
            </header>

            {/* VER DPS COMO FAZER */}
            {/* <UserProfile show={show} /> */}

            <Modal show={show} onHide={handleClose}>
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
                    <Button variant="outline-danger" onClick={handleClose}>Fechar</Button>
                    <Button variant="outline-secondary" onClick={handleClose}>Editar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}