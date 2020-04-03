import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaPowerOff, FaUser } from 'react-icons/fa'
import logoImg from '../../../assets/logo.png';

export default function Header(){   
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const history = useHistory();

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="header-style">
            <header>
                <Link to="/inicio"><img className="logo-img" src={logoImg} width="200" alt="Sangue Bom" /></Link>
                <span className="absolute">Bem vindo, {nomeUsuario}</span>    
                <button className="absolute-userprofile grey-button">
                    <FaUser size={18} color="#CF3537"></FaUser>
                </button>
                <button onClick={handleLogout} type="button">
                    <FaPowerOff size={18} color="#ced4da"></FaPowerOff>
                </button>
            </header>
        </div>
    )
}