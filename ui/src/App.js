import React from "react";
import "./App.css";
import thunkMiddleware from "redux-thunk";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Feed from "./Feed";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PostDialog from "./PostDialog";
import RegisterDialog from "./RegisterDialog";
import { createStore, applyMiddleware } from "redux";
import postApp from "./redux/reducer";
import { register, login, post, fetchPosts, filter, registerWebPush } from "./redux/actions";
import FilterDialog from "./FilterDialog";
const store = createStore(postApp, applyMiddleware(thunkMiddleware));
store.dispatch(fetchPosts());
function App() {
  const [addPostOpen, setAddPostOpen] = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(
    store.getState().user.username == null
  );
  const [posts, setPosts] = React.useState(store.getState().posts);
  const [push, setPush] = React.useState(store.getState().push);

  var currentFilter = store.getState().filter;

  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    console.log(state)
    setLoginOpen(!state.user.username);
    setAddPostOpen(false);
    setPosts(state.posts);
    setPush(state.push);
    if (state.filter !== currentFilter) {
      currentFilter = state.filter;
      if (currentFilter.startsWith("#")) {
        store.dispatch(fetchPosts({tag:currentFilter}));
      } else if (currentFilter.length == 0) {
        store.dispatch(fetchPosts());
      } else {
        store.dispatch(fetchPosts({author:currentFilter}));
      }
    }
  });

  function handleClose(e) {
    const state = store.getState();
    console.log(state);
    switch (e.currentTarget.id) {
      case "unregister":
        return store.dispatch(registerWebPush(false));
      case "login":
        return store.dispatch(login(arguments[1], arguments[2]));
      case "register":
        return store.dispatch(register(arguments[1], arguments[2]));
      case "filter":
          setFilterOpen(false);
        return store.dispatch(filter(arguments[1]));
      case "post":
        setAddPostOpen(false);
        return store.dispatch(post(state.user.username, arguments[1]));
      case "cancel":
          setFilterOpen(false);
          setAddPostOpen(false);
          break;
    }
  }

  function open() {
    setAddPostOpen(true);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemText primary="Filter" onClick={()=>setFilterOpen(true)} />
          </ListItem>
          {!push.enabled && <ListItem button>
            <ListItemText primary="Enable Push" onClick={()=>store.dispatch(registerWebPush(true))} />
          </ListItem>}
          {push.enabled && <ListItem button>
            <ListItemText primary="Disable Push" onClick={()=>store.dispatch(registerWebPush(false))} />
          </ListItem>}
        </List>
      </div>
      <Feed posts={posts} />
      <Fab color="primary" aria-label="add" className="fab" onClick={open}>
        <AddIcon />
      </Fab>
      <PostDialog open={addPostOpen} handleClose={handleClose} />
      <RegisterDialog open={loginOpen} handleClose={handleClose} />
      <FilterDialog open={filterOpen} handleClose={handleClose} />
    </div>
  );
}

export default App;
