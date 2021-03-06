import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import './styles.css'
import Header from '../shared/Header';

import api from '../../services/api'

export default function Register(){
    const [nome, setNome] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [peso, setPeso] = useState('');
    var [sexo, setSexo] = useState('');
    const [tipoSang, setTipoSang] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');

    const history = useHistory();

    // const salt = '$2b$10$98kkLiN1rIgvAsbayyd1Be';
    // var senhaEncriptada = bcrypt.hashSync(senha, salt);

    function validatePassword(){
        if(senha !== confirmSenha){
            swal("Tente Novamente!", "A confirmação de senha inserida é diferente da senha.","warning")
            return false;
        }
        return true;
    }

    async function handleRegister(e) {
        e.preventDefault();

        if(validatePassword()){
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

            switch(data.sexo){
                case 'Masculino':
                    data.sexo = 'M';
                    break;
                case 'Feminino':
                    data.sexo = 'F';
                    break;
                default:
                    data.sexo = 'M';
            }    

            try{
                const response = await api.post('usuario', data);
                swal("Confirmado!", response.data.status, "success")
                history.push('/')
            }catch (err){
                err.response === undefined ? swal("Erro!", "Não foi possível acessar o banco de dados, ele está offline.", "error") : swal("Erro!", err.response.data, "error");
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="tab-img tab-register-position"><div className="tab-text">Cadastro</div></div>
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
                                            required={true}
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
                                        <label>Sexo: </label>
                                        <select 
                                            className="form-control"
                                            value={sexo}
                                            onChange={e => setSexo(e.target.value)} 
                                        >
                                            <option selected >Masculino</option>
                                            <option>Feminino</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>Tipo Sanguíneo:</label>
                                        <select    
                                            className="form-control"
                                            value={tipoSang}
                                            onChange={e => setTipoSang(e.target.value)} 
                                        >
                                            <option>Não sei</option>
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>O+</option>
                                            <option>O-</option>
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
                                            minLength={8}
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>*Confirmar senha:</label>
                                        <input  
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Confirmação de senha" 
                                            required={true}
                                            minLength={8}
                                            value={confirmSenha}
                                            onChange={e => setConfirmSenha(e.target.value)}
                                        />
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