import React, { useState } from "react";

const PostItem = ({ item, index }) => {
  return (
    <div className="card p-3">
      <span className="col card p-1">{index + 1}</span>

      <div className="p-3">
        <div className="row gap-2">
          <span className="btn btn-light fs1 p-2 card shadow">
            {item?.title}
          </span>
          <span className="card p-1 col">
            נושאים:{" "}
            {item?.tags?.map((item) => (
              <>
                {item},{` `}
              </>
            ))}
          </span>
        </div>

        <span className=" m-2 card p-2">{item?.content}</span>
        <span className="card">
          נוצר בתאריך: {item?.createdAt.toLocaleDateString("he-IL")}
        </span>
        <div className="row m-2 gap-1">
          <div className="col p-2 card">לייקים: {item.likes.likes}</div>
          <div className="col p-2 card">שיתופים: {item.shares.shares}</div>
        </div>
      </div>

      <hr className="card mb-1" />
    </div>
  );
};

export default PostItem;
