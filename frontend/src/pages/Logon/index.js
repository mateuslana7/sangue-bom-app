import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
// import {} from 'react-icons/fa'

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo-without-text.png';
import Header from '../shared/Header';

export default function Logon(){
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        const data = {
            nomeUsuario,
            senha
        };
        
        try {
            const response = await api.post('sessions', data);
            localStorage.setItem('usuarioId', response.data.id);
            localStorage.setItem('nomeUsuario', response.data.nome);
            history.push('/inicio');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="aba">Login</div>
                <div className="middle-box text-center loginscreen">
                    <img src={logoImg} alt="" />
                    <div>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input 
                                    className="form-control" 
                                    placeholder="Nome de Usuário" 
                                    required={true}
                                    value={nomeUsuario}
                                    onChange={e => setNomeUsuario(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Senha" 
                                    required={true}
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)} 
                                />
                            </div>
                            <button className="button" type="submit">ENTRAR</button>
                        </form>
                        <div className="login-footnote">
                            <Link style={{marginRight: 18, marginLeft: 10}} to="/recuperar-senha">Esqueci minha senha</Link>
                            <Link to="/cadastro">Cadastrar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}