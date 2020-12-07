import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import UserRepository from '../pages/Repository';
import Following from '../pages/Following';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repositories/:repository+" component={UserRepository} />
      <Route path="/users/:repository+" component={Following} />
    </Switch>
  );
};

export default Routes;
