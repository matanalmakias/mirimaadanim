import React, { useState } from "react";
import CreateBid from "./CreateBid";
import BidList from "./BidList";

const Bid = () => {
  const [showCreateBid, setShowCreateBid] = useState(false);
  const [showAllBids, setShowAllBids] = useState(false);
  return (
    <div className="m-2">
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowCreateBid((s) => !s)}
      >
        {showCreateBid ? "סגור" : "הוסף הצעת מחיר חדשה"}
      </button>
      {showCreateBid && <CreateBid />}
      <button
        className="btn btn-secondary fs1 w-100 p-1 mb-2 "
        onClick={() => setShowAllBids((s) => !s)}
      >
        {showAllBids ? "סגור" : "רשימת הצעות מחיר"}
      </button>
      {showAllBids && <BidList />}
    </div>
  );
};

export default Bid;
