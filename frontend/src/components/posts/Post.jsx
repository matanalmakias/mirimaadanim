import React, { useState } from "react";
import PostList from "./PostList";

const Post = () => {
  return (
    <div className="m-2  w-100 ">
      <h4 className="h2 bg-light">פוסטים</h4>
      <PostList />
    </div>
  );
};

export default Post;
