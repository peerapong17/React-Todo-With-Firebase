import React from "react";
import "./App.css";
import TodoMain from "./todo/todo";
import Login from "./auth/login/login";
import Register from "./auth/register/register";
import PrivateRoute from "./route/privatedRoute";
import { auth } from "./firebase/firebaseConfig";
import ResetPassword from "./auth/resetPass/resetPassword";
import { CircularProgress, Container, makeStyles } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const styles = makeStyles({
  container: {
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function App(): JSX.Element {
  const classes = styles();
  const [authentication, setAuthState] = React.useState<{
    authenticated: boolean;
    initializing: boolean;
  }>({
    authenticated: false,
    initializing: true,
  });

  React.useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthState({
            authenticated: true,
            initializing: false,
          });
        } else {
          setAuthState({
            authenticated: false,
            initializing: false,
          });
        }
      }),
    []
  );

  if (authentication.initializing) {
    return (
      <Container className={classes.container}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute
          path="/todo"
          component={TodoMain}
          authenticated={authentication.authenticated}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
