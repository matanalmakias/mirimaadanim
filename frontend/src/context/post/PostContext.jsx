import React, { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import postService from "../../services/post/post.service";
import { SocketContext } from "../SocketContext";
export const PostContext = createContext({ allPosts: [] });
export const PostProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    postService.getAllPosts().then((res) => setAllPosts(res.data));

    socket.on("post-update", () => {
      postService.getAllPosts().then((res) => setAllPosts(res.data));
    });

    return () => {
      socket.off("post-update");
    };
  }, []);
  const contextValues = { allPosts };
  return (
    <PostContext.Provider value={contextValues}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
