import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import logoImg from '../../../assets/white-logo.png';

import './styles.css'

export default function Header(){   
    return (

        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="pull-left" to="/"><img src={logoImg} width="150" alt="Sangue Bom"/></Link>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                    <FaBars color="#FFF" />
                </button>
                <div className="collapse navbar-collapse navbar-right" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Pagina Inicial</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contato" className="nav-link">Fale Conosco</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="sobre" className="nav-link">Sobre o Sistema</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}