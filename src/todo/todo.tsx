/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../state/reducers";
import { auth } from "../firebase/firebaseConfig";
import { useTodoAction } from "../state/useActions/todo";
import TodoForm from "./todoForm/todoForm";
import TodoList from "./todoList/todoList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TodoMain: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { fetchTodoList, clear } = useTodoAction();
  const { loading, error, todoList } = useSelector(
    (state: RootState) => state.todoReducer
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const [selectedDate, setSelectedDate] = React.useState<string>(
    new Date().toISOString().split("T")[0]
  );

  React.useEffect(() => {
    fetchTodoList();
  }, []);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(new Date());
    console.log(typeof new Date().toISOString());
    console.log(new Date().toISOString());
    console.log(e.target.value);
    todoList.map((todo) => {
      console.log(todo.createdAt.toDate().toISOString().split("T")[0]);
      console.log(new Date(todo.createdAt.seconds).toDateString());
    });
    setSelectedDate(e.target.value);
  };

  const dataListener = () => {
    return [...todoList].filter((todo) => {
      return (
        todo.createdAt.toDate().toISOString().split("T")[0] == selectedDate
      );
    });
  };

  const onLogout = async () => {
    await auth.signOut();
    history.push("/login");
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo {auth.currentUser?.displayName?.split(" ")[0] ?? ""}
          </Typography>
          <Button
            onClick={() => setOpen(true)}
            variant="text"
            endIcon={<ExitToAppIcon />}
            color="secondary"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid
          container
          justifyContent="center"
          className={classes.gridContainer}
          spacing={6}
        >
          <Grid item xs={7} md={4}>
            <TodoForm />
            {loading ? (
              <CircularProgress
                color="secondary"
                className={classes.circular}
              />
            ) : dataListener().length > 0 ? (
              dataListener().map((data, i) => {
                return <TodoList key={i} data={data} />;
              })
            ) : (
              <Typography className={classes.noTask} variant="h4">
                No Task To Do...
              </Typography>
            )}
          </Grid>
          <Grid item xs={7} md={4}>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(e)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Container>
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
      <Dialog open={open}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be directed to login page
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={onLogout}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TodoMain;
