import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContentText } from "@material-ui/core";

export default function FilterDialog(props) {

  const [postText, setPostText] = React.useState("");

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filter Posts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To filter by hashtags, prepend with hash, to filter by author type an author name, to clear the filter clear the filter.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={postText}
            onChange={(e) =>{setPostText(e.currentTarget.value)}}
            id="post"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={(e) =>props.handleClose(e, null)} color="primary" id="filter">
            Cancel
          </Button>
          <Button onClick={(e) =>props.handleClose(e, postText)} color="primary" id="filter">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
