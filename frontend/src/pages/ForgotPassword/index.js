import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Header from '../shared/Header';
import logoImg from '../../assets/logo-without-text.png';

import api from '../../services/api'; 

export default function ForgotPassword(){
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function sendMail(e){
        e.preventDefault();

        const data = {
            email 
        }

        try {
            const response = await api.put('usuario', data);
            //ARRUMAR DPS
            swal ({
                title: 'Confirmado',
                text: response.data.message,
                icon: 'success'
            });
            history.push('/');
        } catch (err) {
            swal ({
                title: 'Erro',
                text: 'Email não cadastrado, tente novamente.',
                icon: 'error'
            });
        }
        
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
                        <form onSubmit={sendMail}>
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