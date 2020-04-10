import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Logon from './pages/Logon';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import NewExam from './pages/NewExam';
import Exams from './pages/Exams';
import Graphics from './pages/Graphics';
import EditUserProfile from './pages/EditUserProfile';

export default function RoutesAfterLogin() {

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
                <Route path="/perfil/editar" component={EditUserProfile} />
            </Switch>
        </BrowserRouter>
    );
}