import React from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Logon from './pages/Logon';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AppAfterLogin from './pages/AppAfterLogin/AppAfterLogin';

export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/sobre" component={About} />
                <Route path="/contato" component={ContactUs} />
                <Route path="/cadastro" component={Register} />
                <Route path="/recuperar-senha" component={ForgotPassword} />
                <Route path="" component={AppAfterLogin} />
            </Switch>
        </BrowserRouter>
    )
    
}