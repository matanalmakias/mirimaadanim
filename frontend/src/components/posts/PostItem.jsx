import React, { useState } from "react";

const PostItem = ({ item, index }) => {
  return (
    <div className="card p-3 mb-1">
      <span className="col card p-1 mb-1">{index + 1}</span>

      <div className="p-3 mb-1">
        <div className="row gap-2 mb-1">
          <label className=" mb-1" htmlFor="title">
            כותרת
          </label>
          <span className="btn btn-light fs1 p-2 card shadow mb-1">
            {item?.title}
          </span>
          <label className=" mb-1" htmlFor="consept">
            נושאים
          </label>
          <span className="card p-1 col mb-1">
            {item?.tags?.map((item) => (
              <>
                {item},{` `}
              </>
            ))}
          </span>
        </div>
        <label className=" mb-1" htmlFor="content">
          תוכן הפוסט
        </label>
        <span className=" m-2 card p-2 mb-1">{item?.content}</span>
        <label className=" mb-1" htmlFor="content">
          תאריך
        </label>

        <span className="card  mb-1">
          {item?.createdAt.toLocaleDateString("he-IL")}
        </span>
        <div className="row m-2 gap-1 mb-1">
          <div className="col p-2 card mb-1">לייקים: {item.likes.likes}</div>
          <div className="col p-2 card mb-1">שיתופים: {item.shares.shares}</div>
        </div>
      </div>

      <hr className="card mb-1" />
    </div>
  );
};

export default PostItem;
