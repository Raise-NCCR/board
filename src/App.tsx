import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './PrivateRoute';
import { FirebaseProvider } from './firebase'

import Top from './pages/Top';
import Home from './pages/Home';
import paths from './paths';
import './App.css';

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Switch>
          <div>
            <Route exact path={paths.top} component={Top} />
            <PrivateRoute exact path={paths.home}>
              <Home />
            </PrivateRoute>
          </div>
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  )
}

export default App;
