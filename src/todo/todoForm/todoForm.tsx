import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./styles";
import { Button, Card, TextField } from "@material-ui/core";
import { useTodoAction } from "../../state/useActions/todo";

const TodoForm: React.FC = () => {
  const classes = useStyles();
  const { createTodo: addTodo } = useTodoAction();
  const [task, setTask] = React.useState<string>("");

  const onClick = () => {
    if (task.trim() !== "") {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <Card className={classes.card}>
      <TextField
        className={classes.textField}
        variant="standard"
        placeholder="Todooo...."
        value={task}
        name="task"
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button
        type="button"
        onClick={onClick}
        variant="contained"
        color="secondary"
      >
        <AddIcon />
      </Button>
    </Card>
  );
};

export default TodoForm;
