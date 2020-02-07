import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/Login/Login.js';
import Admin from './pages/Admin/Admin.js';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';

import * as serviceWorker from './serviceWorker';

import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

const Rota = ({ component: Component }) => (
    <Route
        render={
            props =>
                localStorage.getItem('usuario-token') != null ? (
                    <Admin {...props} />
                ) : (
                    <Login />
                    )
        }
    >

    </Route>
)
const routing = (
    <Router>
        <div>
            <Switch>
                <Rota path="/" component={Login} />
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
