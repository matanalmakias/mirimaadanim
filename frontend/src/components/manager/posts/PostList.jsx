import React from "react";
import PostItem from "./PostItem";
import { postList } from "../../../utils/content";

const PostList = () => {
  return (
    <div>
      {postList?.map((item, index) => (
        <PostItem key={item._id} index={index} item={item} />
      ))}
    </div>
  );
};

export default PostList;
