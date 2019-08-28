import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
function Sidebar() {

    return <div className="sidebar">
        <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Feed" />
        </ListItem>
      </List>
    </div>
}

export default Sidebar;