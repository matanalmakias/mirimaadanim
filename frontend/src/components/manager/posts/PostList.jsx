import React, { useContext } from "react";
import PostItem from "./PostItem";
import { postList } from "../../../utils/content";
import PostContext from "../../../context/post/PostContext";

const PostList = () => {
  const { allPosts } = useContext(PostContext);
  return (
    <div>
      {allPosts?.map((item, index) => (
        <PostItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default PostList;
