import React, { useState } from "react";

const PostItem = ({ item, index }) => {
  const [showItem, setShowItem] = useState(false);

  const date = new Date(item?.createdAt);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("he-IL", options);
  return (
    <div className="">
      <span className="col card">{index + 1}</span>
      <span
        onClick={() => setShowItem((s) => !s)}
        className="btn btn-light fs1 p-2 card m-2"
      >
        {item?.title}
      </span>
      {showItem && (
        <div className="p-3">
          <div className="row gap-1">
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
          <span className="card">נוצר בתאריך: {formattedDate}</span>
          <div className="row m-2">
            <div className="col p-2 card">לייקים: {item.likes.likes}</div>
            <div className="col p-2 card">שיתופים: {item.shares.shares}</div>
          </div>
        </div>
      )}
      <hr className="card mb-1" />
    </div>
  );
};

export default PostItem;
