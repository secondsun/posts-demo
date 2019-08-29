import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function RegisterDialog(props) {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login/Register</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            helperText="userName"
            id="userName"
            value={username}
            onChange={(e) =>{setUsername(e.currentTarget.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            helperText="password"
            value={password}
            onChange={(e) =>{setPassword(e.currentTarget.value)}}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => {props.handleClose(e, username, password)}} color="primary" id="login">
            Login
          </Button>
          <Button onClick={(e) => {props.handleClose(e, username, password)}} color="primary" id="register">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
