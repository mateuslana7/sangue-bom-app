import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import Home from './pages/Home';
import NewExam from './pages/NewExam';
import ForgotPassword from './pages/ForgotPassword';
import Exams from './pages/Exams';
import UserProfile from './pages/UserProfile';
import Graphics from './pages/Graphics';

export default function Routes(){
    // const history = useHistory();

    //FAZER DEPOIS
    // function verifyUser(){
    //     const usuarioId = localStorage.getItem('usuarioId');
    //     if(typeof(localStorage.getItem('usuarioId')) === null){
    //         //redirect to login
    //         // history.push('/');
    //     }
    // }

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/sobre" exact component={About} />
                <Route path="/contato" exact component={ContactUs} />
                <Route path="/cadastro" component={Register} />
                <Route path="/inicio" component={Home} />
                <Route path="/exames/novo" component={NewExam} />
                <Route path="/exames/editar" component={NewExam} />
                <Route path="/recuperar-senha" component={ForgotPassword} />
                <Route path="/exames/graficos" component={Graphics} />
                <Route path="/exames" component={Exams} />
                <Route path="/meu-perfil" component={UserProfile} />
            </Switch>
        </BrowserRouter>
    );
}