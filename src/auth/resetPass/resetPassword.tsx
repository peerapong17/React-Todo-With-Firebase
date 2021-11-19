import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RootState } from "../../state/reducers";
import { useAuthAction } from "../../state/useActions/auth";
import { useStyles } from "./styles";
import * as yup from "yup";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword: React.FC = () => {
  const { error, loading, success } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { clear: clearError, resetPassword } = useAuthAction();
  const classes = useStyles();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "" as string,
    },
    validationSchema: yup.object({
      email: yup.string().email("Email is not valid").required("Email is required"),
    }),
    onSubmit: ({ email }) => {
      resetPassword(email, history);
    },
  });

  React.useEffect(() => {
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
            <h1 className={classes.text}>Reset Password</h1>
            <TextField
              className={classes.textField}
              variant="filled"
              label="Email"
              value={formik.values.email}
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
            />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography className={classes.loginLink}>Login</Typography>
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
                {loading ? "Loading..." : "Send"}
              </Button>
            }
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
        {success && (
          <Snackbar
            open={success !== ""}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </Container>
  );
};

export default ResetPassword;
