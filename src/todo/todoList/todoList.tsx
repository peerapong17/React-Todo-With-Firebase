import {
  Button,
  Card,
  Checkbox,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";
import { useTodoAction } from "../../state/useActions/todo";

export interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
}

const TodoList: React.FC<{
  data: Todo;
}> = ({ data: { task, id, isCompleted } }) => {
  const classes = useStyles();
  const { deleteTodo, updateTodo, checkedTodo } = useTodoAction();
  const [todo, setTodo] = React.useState<Todo>({
    id,
    task,
    isCompleted,
  });
  const [isEditting, setIsEditting] = React.useState<boolean>(false);

  const onToggle = () => {
    checkedTodo(todo);
    setTodo((prev) => {
      return {
        ...prev,
        isCompleted: !todo.isCompleted,
      };
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <Checkbox checked={todo.isCompleted} onChange={onToggle} />
        {isEditting ? (
          <TextField
            value={todo.task}
            name="task"
            variant="standard"
            onChange={onChange}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.resize,
              },
            }}
            autoFocus
          />
        ) : (
          <Typography variant="h5" className={classes.task}>
            {task}
          </Typography>
        )}
        <div>
          {isEditting ? (
            <div className={classes.btnContainer}>
              <Button
                style={{ marginRight: "4px", backgroundColor: "#99ffb4" }}
                variant="contained"
                onClick={() => {
                  setIsEditting(!isEditting);
                  updateTodo(todo);
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                onClick={() => {
                  setIsEditting(!isEditting);
                  setTodo({ id, task, isCompleted });
                }}
                variant="contained"
                color="secondary"
              >
                <CloseIcon />
              </Button>
            </div>
          ) : (
            <div className={classes.btnContainer}>
              <Button
                style={{ marginRight: "4px" }}
                variant="contained"
                color="primary"
                onClick={() => setIsEditting(!isEditting)}
              >
                <EditIcon />
              </Button>
              <Button
                onClick={() => deleteTodo(id)}
                variant="contained"
                color="secondary"
              >
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TodoList;
