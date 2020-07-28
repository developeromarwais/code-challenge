import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Markets } from './pages';

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/currency/:name' component={ Markets } />
      </Switch>
    </BrowserRouter>
  );
};
