var moves = []

function addMove(move){
    moves.unshift(move);
}

function getMoves(){
    return moves;
}

function setMoves(movesToSet){
    moves = JSON.parse(JSON.stringify(movesToSet));
}

export default {
    addMove,
    getMoves,
    setMoves
  };