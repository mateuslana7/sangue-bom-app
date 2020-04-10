import React, {useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import swal from 'sweetalert';

import './styles.css'
import Header from '../shared/Header';

import api from '../../services/api'

export default function Register(){
    const usuarioId = localStorage.getItem('usuarioId');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();
    const location = useLocation();

    const obj = (location.state !== undefined) ? location.state.detail : {};

    switch(obj.sexo){
        case 'M':
            obj.sexo = 'Masculino';
            break;
        case 'F':
            obj.sexo = 'Feminino';
            break;
        default:
            obj.sexo = 'Masculino';
            break;
    }

    const [nome, setNome] = useState(obj.nome);
    const [dataNasc, setDataNasc] = useState(obj.dataNasc);
    const [peso, setPeso] = useState(obj.peso);
    var [sexo, setSexo] = useState(obj.sexo);
    const [tipoSang, setTipoSang] = useState(obj.tipoSang);
    const [nomeUsuario, setNomeUsuario] = useState(obj.nomeUsuario);
    const [email, setEmail] = useState(obj.email);

    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmNovaSenha, setConfirmNovaSenha] = useState('');

    function validatePassword(){
        if(novaSenha !== confirmNovaSenha){
            swal("Tente Novamente!", "A confirmação de senha inserida é diferente da senha.","warning")
            return false;
        }
        return true;
    }

    async function deleteAlert(){
        swal({
            title: "Atenção",
            text: "Você tem certeza que deseja excluir sua conta ?",
            icon: "warning",
            buttons: ["Cancelar", "Confirmar"],
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
              await handleDeleteAccount();
            }
        });
    }

    async function handleDeleteAccount(){
        try {
            await api.delete('perfil', {
                headers: {
                    Authorization: usuarioId,
                }
            });
            swal("Confirmado", 'A sua conta foi excluída com sucesso!', "success");
            localStorage.clear();
            history.push('/');
        } catch (err) {
            swal("Erro!",'Não foi possível excluir a conta, tente novamente.',"error");
        }
    }

    async function handleEditProfile(e) {
        e.preventDefault();

        const data = {
            nome,
            dataNasc,
            peso,
            sexo,
            tipoSang,
            nomeUsuario,
            email,
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
                break;
        }

        try{
            await api.put('perfil', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            swal("Confirmado", 'Edição salva com sucesso!', "success")
            history.push('/inicio')
        }catch (err){
            err.response === undefined ? swal("Erro!", "Não foi possível acessar o banco de dados, ele está offline.", "error") : swal("Erro!", err.response.data, "error");
            // swal("Erro!",'Falha na edição, tente novamente.',"error");
        }
    }

    async function handleChangePass(e){
        e.preventDefault();

        if(validatePassword()){
            const data = {
                senhaAtual,
                novaSenha 
            }

            try{
                await api.put('alterar-senha', data, {
                    headers: {
                        Authorization: usuarioId,
                    }
                });
                swal("Confirmado", 'Senha alterada com sucesso! Faça login novamente.', "success")
                handleClose();
                localStorage.clear();
                history.push('/');
            }catch (err){
                //USAR MENSGAM DO BACKEND DPS
                swal("Erro!",'Senha atual errada, tente novamente.',"error");
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="tab-img tab-register-position"><div className="tab-text">Meu Perfil</div></div>
                <div className="middle-box registerscreen">
                    <div>
                        <form onSubmit={handleEditProfile} className="form-group">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 col-lg-8">
                                        <label>Nome:</label>
                                        <input 
                                            className="form-control" 
                                            required={true}
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-4">
                                        <button type="button" onClick={deleteAlert} className="button-edit-pass">EXCLUIR CONTA</button>
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
                                            <option>Masculino</option>
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
                                        <label>Nome de Usuário:</label>
                                        <input
                                            className="form-control" 
                                            required={true}
                                            value={nomeUsuario}
                                            onChange={e => setNomeUsuario(e.target.value)}  
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>E-mail:</label>
                                        <input 
                                            type="email"
                                            className="form-control" 
                                            required={true}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6 pass-input">
                                        <label>Senha:</label>
                                        <input 
                                            type="password"
                                            className="form-control" 
                                            required={true}
                                            value={"abcd1234"} 
                                        />
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <button onClick={handleShow} type="button" className="button-edit-pass">EDITAR SENHA</button>
                                    </div>                              
                                    <div className="col-sm-12 col-lg-6">
                                        <Link to="/inicio">
                                            <button className="button-back">CANCELAR</button>
                                        </Link>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <button className="button" type="submit">SALVAR ALTERAÇÕES</button>
                                    </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h4>Alterar Senha</h4></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleChangePass} className="form-group">
                        <div className="col-sm-12 col-lg-12">
                            <label>Senha atual:</label>
                            <input 
                                type="password"
                                className="form-control" 
                                required={true}
                                value={senhaAtual}
                                onChange={e => setSenhaAtual(e.target.value)} 
                            />
                        </div>
                        <div className="col-sm-12 col-lg-12">
                            <label>Nova senha:</label>
                            <input 
                                type="password"
                                className="form-control" 
                                required={true}
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)} 
                            />
                        </div>
                        <div className="col-sm-12 col-lg-12">
                            <label>Confirmação:</label>
                            <input 
                                type="password"
                                className="form-control" 
                                required={true}
                                value={confirmNovaSenha}
                                onChange={e => setConfirmNovaSenha(e.target.value)} 
                            />
                        </div>
                        <hr className="horizontal-line" />
                        <div className="modal-btn-group">
                            <button className="btn btn-secondary" type="button" onClick={handleClose}>Fechar</button>
                            <button className="btn btn-danger" type="submit">Salvar</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}