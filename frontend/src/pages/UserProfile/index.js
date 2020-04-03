import React from 'react';
// import { Link } from 'react-router-dom';

import Header from '../shared/Header';
import './styles.css';

export default function UserProfile(){
    return (
        
        <div className="profile-container">
            <Header/>
            <div className="middle-box text-center home-screen">
                <ul>
                    <li>
                        Nome: <p>Mateus Lana</p>
                    </li>
                    <li>
                        Data de Nascimento: <p>26/11/1996</p>
                    </li>
                    <li>
                        Peso: <p>75</p>
                    </li>
                    <li>
                        Tipo Sanguíneo: <p>A+</p>
                    </li>
                    <li>
                        Nome de Usuário: <p>mateuslana</p>
                    </li>
                    <li>
                        Email: <p>mateus_lana7@hotmail.com</p>
                    </li>
                </ul>
            </div>
        </div>
        
    );
}