import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: "30px",
    backgroundColor: "#e8fffe",
    boxShadow: "1px 1px 4px #e8e8e8",
    borderRadius: "3px",
  },
  textField: {
    marginBottom: "23px",
  },
  text: {
    textAlign: "center",
    marginBottom: "54px",
  },
  loginLink: {
    textAlign: "end",
    marginBottom: "12px",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
      color: "blue",
    },
  },
  button: {
    fontSize: "18px",
    backgroundColor: "#ff9cf7",
    color: "black",
    fontWeight: "700",
    "&:hover": {
      color: "#ff7af4",
    },
  },
});

export { useStyles };
