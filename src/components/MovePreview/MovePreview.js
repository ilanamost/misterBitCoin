import React from "react";

import './MovePreview.css'

const MovePreview = ({ move }) => {
  return (
    <div className="move-preview">
     {console.log('move in movePreview', move)}
      <div className="move-preview-data">To: {move.to}</div>
      <div className="move-preview-data">Amount: {move.amount}</div>
      <div className="move-preview-data">At: {move.at}</div>
    </div>
  );
};

export default MovePreview;
