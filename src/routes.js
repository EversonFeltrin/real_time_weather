import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/index';

export const Routes = () => (
    <Switch>
        <Route path='/' exact component={Dashboard} />
    </Switch>
) 

export default Routes;