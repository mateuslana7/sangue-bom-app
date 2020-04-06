import React from 'react';

import './styles.css'

import HeaderLogin from '../HeaderLogin';
import HeaderLogout from '../HeaderLogout';

export default function Header(){
    
    if("usuarioId" in localStorage){
        return <HeaderLogin />;
    }
    return <HeaderLogout />;
}