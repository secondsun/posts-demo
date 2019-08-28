import React from "react";
import { Paper } from "@material-ui/core";
function Feed({ posts }) {
  return (
    <div className="feed">
      {posts.map((value) => {
        return <Paper>
          <div>
            <header>{value.author}</header>
            <div className="post-content">
              <p>
                {value.text}
              </p>
            </div>
          </div>
        </Paper>
      })}

    </div>
  );
}

export default Feed;
