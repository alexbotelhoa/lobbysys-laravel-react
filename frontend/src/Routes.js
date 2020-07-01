import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Visitors from './pages/Visitors';
import Rooms from './pages/Rooms';
import Concierges from './pages/Concierges';

export default function Routes() {
   return (
      <BrowserRouter>
         <Header />
         <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/users" component={Users} />
            <Route path="/visitors" component={Visitors} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/concierges" component={Concierges} />
         </Switch>
      </BrowserRouter>
   )
}
