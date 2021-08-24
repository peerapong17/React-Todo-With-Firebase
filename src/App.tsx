import React from "react";
import "./App.css";
import Todo from "./todo/todo";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import ResetPassword from "./auth/resetPass/resetPassword";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route path="/todo" component={Todo} />
      </Switch>
    </Router>
  );
}

export default App;
