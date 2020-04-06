import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Logon from '../Logon';
import About from '../About';
import ContactUs from '../ContactUs';
import Register from '../Register';
import ForgotPassword from '../ForgotPassword';
import Home from '../Home';
import NewExam from '../NewExam';
import Exams from '../Exams';
import UserProfile from '../UserProfile';
import Graphics from '../Graphics';

export default function AppAfterLogin() {

    if(!("usuarioId" in localStorage))
        return (<Redirect to='/' />);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/sobre" component={About} />
                <Route path="/contato" component={ContactUs} />
                <Route path="/cadastro" component={Register} />
                <Route path="/recuperar-senha" component={ForgotPassword} />

                <Route path="/inicio" component={Home} />
                <Route path="/exames/novo" component={NewExam} />
                <Route path="/exames/editar" component={NewExam} />
                <Route path="/exames/graficos" component={Graphics} />
                <Route path="/exames" component={Exams} />
                <Route path="/meu-perfil" component={UserProfile} />
            </Switch>
        </BrowserRouter>
    );
}