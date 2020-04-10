import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import RoutesAfterLogin from './RoutesAfterLogin'

export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/sobre" component={About} />
                <Route path="/contato" component={ContactUs} />
                <Route path="/cadastro" component={Register} />
                <Route path="/recuperar-senha" component={ForgotPassword} />
                <Route path="" component={RoutesAfterLogin} />
            </Switch>
        </BrowserRouter>
    )
    
}