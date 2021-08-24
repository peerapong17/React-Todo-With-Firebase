import { Button, Card, TextField, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";
import { useTodoAction } from "../../state/useActions/todo";

const TodoList: React.FC<{ data: { task: string; id: string } }> = ({
  data: { task, id },
}) => {
  const classes = useStyles();
  const { deleteTodo, updateTodo } = useTodoAction();
  const [editedTask, setEditedTask] = React.useState<string>(task);
  const [isEditting, setIsEditting] = React.useState<boolean>(false);

  const onDelete = () => {
    deleteTodo(id);
  };

  const onEdit = () => {
    updateTodo(id, editedTask);
  };

  return (
    <React.Fragment>
      <Card className={classes.card}>
        {isEditting ? (
          <TextField
            value={editedTask}
            variant="standard"
            onChange={(e) => setEditedTask(e.target.value)}
            InputProps={{
              disableUnderline: true,
            }}
            autoFocus
          />
        ) : (
          <Typography variant="h5">{task}</Typography>
        )}
        <div>
          {isEditting ? (
            <Button
              style={{ marginRight: "4px", backgroundColor: "#99ffb4" }}
              variant="contained"
              onClick={() => {
                setIsEditting(!isEditting);
                onEdit();
              }}
            >
              <CheckIcon />
            </Button>
          ) : (
            <Button
              style={{ marginRight: "4px" }}
              variant="contained"
              color="primary"
              onClick={() => setIsEditting(!isEditting)}
            >
              <EditIcon />
            </Button>
          )}
          {isEditting ? (
            <Button
              onClick={() => {
                setIsEditting(!isEditting);
                setEditedTask(task);
              }}
              variant="contained"
              color="secondary"
            >
              <CloseIcon />
            </Button>
          ) : (
            <Button onClick={onDelete} variant="contained" color="secondary">
              <DeleteIcon />
            </Button>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TodoList;
