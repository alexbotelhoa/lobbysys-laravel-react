import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Visitors from './pages/Visitors';
import Rooms from './pages/Rooms';
import Concierges from './pages/Concierges';
const NoMatch = () => <h1 style={{ 
   width: "100%",
   height: "100vh",
   display: "flex",
   flex: "1",
   alignItems: "center",
   justifyContent: "center",
   background: "#fff"
}}>404 Not Found</h1>

export default function Routes() {
   return (
      <Router>
         <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard">
               <Header selected="dashboard" />
               <Dashboard />
            </Route>
            <Route path="/users">
               <Header selected="users" />
               <Users />
            </Route>
            <Route path="/visitors">
               <Header selected="visitors" />
               <Visitors />
            </Route>
            <Route path="/rooms">
               <Header selected="rooms" />
               <Rooms />
            </Route>
            <Route path="/concierges">
               <Header selected="concierges" />
               <Concierges />
            </Route>
            <Route component={NoMatch} />
         </Switch>
      </Router>
   )
}
