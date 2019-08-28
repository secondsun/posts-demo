import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PostDialog from "./PostDialog";
import RegisterDialog from "./RegisterDialog";
import { createStore } from "redux";
import postApp from "./redux/reducer";
import { register, login } from './redux/actions'

function App() {
  const store = createStore(postApp);

  const [addPostOpen, setAddPostOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(true);

  
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    setLoginOpen(state.user == null )
  })

  function handleClose(e) {
    switch (e.currentTarget.id) {
      case "login":
          return store.dispatch(login(arguments[1],arguments[2]))
      case "register":
          return store.dispatch(register(arguments[1],arguments[2]))
      case "post":
      case "cancel":
          return store.dispatch( setAddPostOpen(false));
    }
  }

  function open() {
    setAddPostOpen(true);
  }

  return (
    <div className="App">
      <Sidebar />
      <Feed />
      <Fab color="primary" aria-label="add" className="fab" onClick={open}>
        <AddIcon />
      </Fab>
      <PostDialog open={addPostOpen} handleClose={handleClose} />
      <RegisterDialog open={loginOpen} handleClose={handleClose} />
    </div>
  );
}

export default App;
