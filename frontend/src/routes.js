import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Visitors from './pages/Visitors';
import Rooms from './pages/Rooms';
import Concierges from './pages/Concierges';

export default function Routes() {

   /**
    * Se quiser construir o sistema de Login totalmente em Javascript
    * basta retirar essa função a baixo e criar o Controller
    */
   function redirectLoginInLaravel() { 
      window.location.href="http://192.168.1.101:8000/"; 
    } 

    /**
    * Se quiser construir o sistema de Login totalmente em Javascript
    * basta retirar essa função a baixo e criar o Controller
    */
   function redirectUsersInLaravel() { 
      window.location.href="http://192.168.1.101:8000/register"; 
    } 

   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={() =>redirectLoginInLaravel()} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={() => redirectUsersInLaravel()} />
            <Route path="/visitors" component={Visitors} />
            <Route path="/rooms" component={Rooms} />
            <Route path="/concierges" component={Concierges} />
         </Switch>
      </BrowserRouter>
   )
}
