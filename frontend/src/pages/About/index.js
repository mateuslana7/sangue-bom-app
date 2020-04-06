import React from 'react';

import './styles.css';
import logoImg from '../../assets/logo.png'

import Header from '../shared/Header';

export default function About(){
    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="aba">Sobre o Sistema</div>
                <div className="middle-box about-middle-box about-screen">
                <img className="logo-size" src={logoImg} alt="Sangue Bom" />
                    <div className="text-style">
                        <p >
                            O <b>Sangue Bom</b> foi uma aplicação idealizada e prototipada na disciplina Interação Humano Computador durante o curso de Ciência da Computação no segundo período. A ideia era projetar um sistema direcionado para a área da saúde e para atender pessoas acima dos 60 anos.
                        </p>
                        <p>
                            Esta aplicação busca auxiliar pessoas que estão nessa faixa etária no controle dos níveis de colesterol por meio de uma interface simples, procurando proporcionar, para estas pessoas, uma maior facilidade em utilizá-la.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}