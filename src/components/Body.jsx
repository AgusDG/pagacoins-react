import React from 'react';
import WalletsTable from './WalletsTable';
import Wallet from './Wallet';
import Users from "./Users";
import User from "./User";
import { Switch, Route, Redirect } from 'react-router-dom';
import "../styles/global.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Body = () => {
    
    return (
    <div className="container">
        <Switch>
          <Route exact path='/user/:id' component={User}/>
          <Route exact path='/users' component={Users} />
          <Route exact path='/wallet/:id' component={Wallet} />
          <Route exact path='/wallets' component={WalletsTable} />
          <Route exact path='/' component={Users} />
          <Redirect to='/users'  />
        </Switch>
        </div>
    );
};

export default Body;