import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Logon/Header';
import logoImg from '../../assets/logo-without-text.png';

export default function ForgotPassword(){
    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="middle-box text-center loginscreen">
                    <img src={logoImg} alt="" />
                    <div>
                        <div className="col-sm-12 col-lg-12">
                            <p>VOCÊ RECEBERÁ UMA NOVA SENHA</p>
                        </div>
                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Digite seu email" required={true}/>
                            </div>
                            <button className="button" type="submit">CONFIRMAR</button>
                            <Link to='/'><button className="button-back" type="submit">VOLTAR</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}