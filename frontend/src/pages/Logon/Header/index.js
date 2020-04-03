import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/white-logo.png';

import '../../../../node_modules/jquery/dist/jquery.slim';

export default function Header(){   
    return (
        <header className="main-header">
            <nav className="navbar navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/"><img src={logoImg} width="150" alt="Sangue Bom" /></Link>
                    </div>
                    <div className="collapse navbar-collapse pull-right">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Pagina Inicial</Link></li>
                            <li><Link to="/contato">Fale Conosco</Link></li>
                            <li><Link to="/sobre">Sobre o Sistema</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}