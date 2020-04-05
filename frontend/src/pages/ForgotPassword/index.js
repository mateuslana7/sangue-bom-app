import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Logon/Header';
import logoImg from '../../assets/logo-without-text.png';

import generateUniqueId from '../../utils/generateUniqueId';
// import api from '../../services/api'; USAR DPS PARA SALVAR NOVA SENHA

export default function ForgotPassword(){
    const [email, setEmail] = useState('');

    function sendEmail(){
        const password = generateUniqueId();
        return password;
        // alert("Enviando email para: "+email+"\n"+"Nova senha: "+password);
        //FAZER A LÓGICA PARA ENVIO DE EMAILS E ATUALIZAÇÃO DE SENHA DO BANCO
        // try{
        //     await api.put('usuario', password);
        //     history.push('/')
        // }catch (err){
        //     alert('Erro no cadastro, tente novamente.')
        // }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="aba">Esqueci Minha Senha</div>
                <div className="middle-box text-center loginscreen">
                    <img src={logoImg} alt="" />
                    <div>
                        <div className="col-sm-12 col-lg-12">
                            <p>VOCÊ RECEBERÁ UMA NOVA SENHA</p>
                        </div>
                        <form onSubmit={sendEmail}>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Digite seu email cadastrado" 
                                    required={true}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <button className="button" type="submit">CONFIRMAR</button>
                            <Link to='/'><button className="button-back">VOLTAR</button></Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}