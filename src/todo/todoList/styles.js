import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  card: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    alignItems: "center"
  },
  resize: {
    fontSize: 24,
  },
  task: {
    flex: 1,
  },
  btnContainer: {
    display: "flex"
  },
});
