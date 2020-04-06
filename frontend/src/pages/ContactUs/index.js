import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

import './styles.css';
import logoImg from '../../assets/logo.png'

import Header from '../shared/Header';

export default function About(){
    return (
        <div>
            <Header />
            <div className="app-container">
                <div className="aba">Fale Conosco</div>
                <div className="middle-box contact-middle-box contact-screen">
                <img className="logo-size" src={logoImg} alt="Sangue Bom" />
                    <div className="text-style">
                        <h4> Desenvolvedor </h4>
                        <p>Mateus Lana</p>
                        <p><b>E-mail: </b> mateus_lana7@hotmail.com</p>
                        <div className="group-icons" style={{textAlign: "center"}}>
                            <a className="icon-style" href="https://www.linkedin.com/in/mateus-lana-388145195"><FaLinkedin /></a>
                            <a className="icon-style"  href="https://www.facebook.com/mateus.vitor.733"><FaFacebook /></a>
                            <a className="icon-style"  href="https://www.instagram.com/mateuslana_/?hl=pt-br"><FaInstagram /></a>
                            <a href="https://twitter.com/mateus_vpl?s=08"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}