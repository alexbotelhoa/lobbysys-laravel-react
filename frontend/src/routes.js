import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Visitors from './pages/Visitors'
import Rooms from './pages/Rooms'

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/users" exact component={Users} />
            <Route path="/visitors" exact component={Visitors} />
            <Route path="/rooms" exact component={Rooms} />
         </Switch>
      </BrowserRouter>
   )
}
