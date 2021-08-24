/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { User } from "../yub/model";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./styles.js";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAuthAction } from "../../state/useActions/auth";
import google from "../../assets/images/google.jpg";
import { useFormik } from "formik";
import { initialValue } from "../yub/value";
import { validationSchema } from "../yub/schema";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login, signInWithGoogle, clearError } = useAuthAction();
  const { error, loading } = useSelector(
    (state: RootState) => state.authReducer
  );
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      login(email, password, history);
    },
  });

  React.useEffect(() => {
    clearError();
    return () => {
      clearError();
    };
  }, []);

  const handleClose = () => {
    clearError();
  };

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <h1 className={classes.text}>Login</h1>
            <TextField
              variant="filled"
              label="Email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              className={classes.textField}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="filled"
              type="password"
              label="Password"
              value={formik.values.password}
              name="password"
              onChange={formik.handleChange}
              className={classes.textField}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <div className={classes.resetOrRegisLinkContainer}>
              <Link style={{ textDecoration: "none" }} to="/register">
                <Typography className={classes.regisOrResetLink}>
                  Don't have an account?
                </Typography>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/reset-password">
                <Typography className={classes.regisOrResetLink}>
                  Forget Password?
                </Typography>
              </Link>
            </div>
            <Button
              className={classes.button}
              size="large"
              type="submit"
              variant="contained"
              disabled={loading ? true : false}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Button
              className={classes.googleBtn}
              size="large"
              type="submit"
              variant="contained"
              disabled={loading ? true : false}
              onClick={() => signInWithGoogle(history)}
            >
              <img
                src={google}
                alt="google"
                width="30"
                height="30"
                style={{ marginRight: "10px" }}
              />
              {loading ? "Loading..." : "Google login"}
            </Button>
          </form>
        </Grid>
        {error && (
          <Snackbar
            open={error !== ""}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
};

export default Login;
