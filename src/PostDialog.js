import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PostDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Make a Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="post"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" id="cancel">
            Cancel
          </Button>
          <Button onClick={props.handleClose} color="primary" id="post">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
