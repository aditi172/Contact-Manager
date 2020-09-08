import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import Login from "./components/auth/Login";
import AlertState from "./context/Alerts/AlertState";
import setAuthToken from './Utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App=()=> {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar title=" Contact-Keeper"></Navbar>
              <div className="container">
                <Alerts></Alerts>
                <Switch>
                  <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
