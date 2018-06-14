import React from "react";

import MovePreview from "../MovePreview/MovePreview";

import './MoveList.css';

const MoveList = props => {
  const movesPreview = props.moves.map((move, i) => {
    return (
      <li key={move.at} className="move-list-item">
        {console.log('move', move)}
        <MovePreview move={move} />
      </li>
    );
  });

  return (
    <div className="move-list">
       {console.log('movesPreview', movesPreview)}
      <ul>{movesPreview}</ul>
    </div>
  );
};

export default MoveList;
