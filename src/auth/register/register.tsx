import React from "react";
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles.js";
import { Link, useHistory } from "react-router-dom";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAuthAction } from "../../state/useActions/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { useFormik } from "formik";
import { registerValidationSchema } from "../yub/schema/registerSchema";
import { registerState } from "../yub/value";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register: React.FC = () => {
  const { error, loading, success } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { register, clear } = useAuthAction();
  const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: registerState,
    validationSchema: registerValidationSchema,
    onSubmit: ({ username, email, password }) => {
      register(username, email, password, history);
    },
  });

  React.useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <h1 className={classes.text}>Register</h1>
            <TextField
              className={classes.textField}
              variant="filled"
              label="Username"
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Email"
              value={formik.values.email}
              name="email"
              type="email"
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="Password"
              value={formik.values.password}
              name="password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              className={classes.textField}
              variant="filled"
              label="ConfirmPassowrd"
              value={formik.values.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography className={classes.loginLink}>
                Already have an account?
              </Typography>
            </Link>
            {
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disabled={loading ? true : false}
                className={classes.button}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
            }
          </form>
        </Grid>
        {error && (
          <Snackbar
            open={error !== ""}
            autoHideDuration={6000}
            onClose={() => clear()}
          >
            <Alert onClose={() => clear()} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar
            open={success !== ""}
            autoHideDuration={6000}
            onClose={() => clear()}
          >
            <Alert onClose={() => clear()} severity="success">
              {success}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
};

export default Register;
