import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
// import bcrypt from 'bcrypt-pbkdf';

import './styles.css'
import Header from '../Logon/Header';

import api from '../../services/api'

export default function Register(){
    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [peso, setPeso] = useState('');
    const [sexo, setSexo] = useState('');
    const [tipoSang, setTipoSang] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    // const salt = '$2b$10$98kkLiN1rIgvAsbayyd1Be';
    // var senhaEncriptada = bcrypt.hashSync(senha, salt);

    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
            nome,
            dataNasc,
            peso,
            sexo,
            tipoSang,
            nomeUsuario,
            email,
            senha
        };

        try{
            const response = await api.post('usuario', data);
            alert(response.data.status);
            history.push('/')
        }catch (err){
            alert('Erro no cadastro, tente novamente.')
        }
    }

    // function validatePassword(){

    // }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="middle-box registerscreen">
                    <div>
                        <form onSubmit={handleRegister} className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-12">
                                        <label>*Nome:</label>
                                        <input 
                                            className="form-control" 
                                            placeholder="Ex.: João da Silva" 
                                            required={true}
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Data de Nascimento:</label>
                                        <input 
                                            type="date" 
                                            className="form-control"
                                            value={dataNasc}
                                            onChange={e => setDataNasc(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm">
                                        <label>Peso (kg):</label>
                                        <input
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Ex.: 75"
                                            value={peso}
                                            onChange={e => setPeso(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Sexo: </label><br></br>
                                        <input 
                                            className="form-control" 
                                            value={sexo}
                                            onChange={e => setSexo(e.target.value)}
                                        />
                                        {/* <input 
                                            className="radiobutton" 
                                            type="radio"
                                            value="M"
                                            checked={this.state.sexo === 'M'}
                                            onSelect={e => setSexo(e.target.value)}  
                                        />
                                        <label>Masculino</label>
                                        <input 
                                            className="radiobutton" 
                                            type="radio"
                                            value={"F"}
                                            checked={this.state.sexo === 'F'}
                                            onChange={e => setSexo(e.target.value)}   
                                        />
                                        <label>Feminino</label> */}
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Tipo Sanguíneo:</label>
                                        <select 
                                            name="tipoSang"    
                                            className="form-control"
                                            value={tipoSang}
                                            onChange={e => setTipoSang(e.target.value)} 
                                        >
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>O+</option>
                                            <option>O-</option>
                                            <option>Não sei</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>*Nome de Usuário:</label>
                                        <input
                                            className="form-control" 
                                            placeholder="Ex.: joaodasilva" 
                                            required={true}
                                            value={nomeUsuario}
                                            onChange={e => setNomeUsuario(e.target.value)}  
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>*E-mail:</label>
                                        <input 
                                            type="email"
                                            className="form-control" 
                                            placeholder="Ex.: joaodasilva@gmail.com" 
                                            required={true}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>*Senha:</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Mínimo 8 caracteres" 
                                            required={true}
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>*Confirmar senha:</label>
                                        <input name="senha" type="password" className="form-control" placeholder="Mínimo 8 caracteres" required={true}/>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <Link to="/">
                                            <button className="button-back">VOLTAR</button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <button className="button" type="submit">CONFIRMAR</button>
                                    </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}