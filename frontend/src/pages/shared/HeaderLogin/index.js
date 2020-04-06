import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'
import { FaBars, FaUser, FaPowerOff } from 'react-icons/fa'
import logoImg from '../../../assets/white-logo.png';
import swal from 'sweetalert';

import api from '../../../services/api';

export default function HeaderLogin(){
    const [usuario, setUsuario] = useState([]);

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
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div className="navbar-brand">
                        <Link className="pull-left" to="/inicio"><img src={logoImg} width="150" alt="Sangue Bom"/></Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                        <FaBars color="#FFF" />
                    </button>
                    <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/inicio" className="nav-link">Pagina Inicial</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contato" className="nav-link">Fale Conosco</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="sobre" className="nav-link">Sobre o Sistema</Link>
                            </li>
                            <li className="nav-item">
                                <p className="nav-user">{usuario.nomeUsuario}</p>
                            </li>
                            <li>
                                <button onClick={handleShow} className="userprofile-button">
                                    <FaUser size={18} color="#CF3537"></FaUser>
                                </button>
                            </li>
                            <li>
                                <button onClick={logoutAlert} type="button" className="userprofile-button">
                                    <FaPowerOff size={18} color="#CF3537"></FaPowerOff>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

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