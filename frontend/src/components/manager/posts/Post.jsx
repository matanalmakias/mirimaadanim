import React, { useState } from "react";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

const Post = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreatePost((s) => !s)}
      >
        {showCreatePost ? "סגור" : "הוסף פוסט חדש"}
      </button>
      {showCreatePost && <CreatePost />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllPosts((s) => !s)}
      >
        {showAllPosts ? "סגור" : "רשימת פוסטים"}
      </button>
      {showAllPosts && <PostList />}
    </div>
  );
};

export default Post;
