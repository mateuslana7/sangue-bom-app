import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../shared/Header';
import './styles.css';

import addImg from '../../assets/add.png';
import editImg from '../../assets/edit.png';
import graphImg from '../../assets/graph.png';
import deleteImg from '../../assets/delete.png';

export default function Home(){
    return (
        <div>
            <Header/>
            <div className="home-container">
                <div className="middle-box text-center home-screen">
                    <ul>
                        <li>
                            <img src={addImg} alt="" />
                            <Link to="/exames/novo">
                                <button className="button">ADICIONAR</button>
                            </Link>
                        </li>
                        <li>
                            <img src={editImg} alt="" />
                            <Link to="/exames">
                                <button className="button">EDITAR</button>
                            </Link>
                        </li>
                        <li>
                            <img src={graphImg} alt="" />
                            <Link to="/exames/graficos">
                                <button className="button">GRÁFICOS</button>
                            </Link>
                        </li>
                        <li>
                            <img src={deleteImg} alt="" />
                            <Link to="/exames">
                                <button className="button">EXCLUIR</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}