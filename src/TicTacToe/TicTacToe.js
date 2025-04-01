import { useState, useEffect } from "react";

const GRID_SIZE = 9;
const PLAYER_1 = "Vishal";
const PLAYER_2 = "Saransh";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const TicTacToe = () => {
  const [clickedGrids, setClickedGrids] = useState(new Map());
  const [playerTurn, setPlayerTurn] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  const handleGridClicked = (index) => {
    if (winner || clickedGrids.has(index)) return;

    setClickedGrids((prev) => {
      const newMap = new Map(prev);
      newMap.set(index, playerTurn === PLAYER_1 ? "O" : "X");
      return newMap;
    });
  };

  useEffect(() => {
    const winningPlayer = checkWinner(clickedGrids);
    if (winningPlayer) {
      setWinner(playerTurn);
    } else {
      setPlayerTurn((prev) => (prev === PLAYER_1 ? PLAYER_2 : PLAYER_1));
    }
  }, [clickedGrids]);

  const checkWinner = (gridState) => {
    return WINNING_COMBINATION.some(
      ([a, b, c]) =>
        gridState.get(a) &&
        gridState.get(a) === gridState.get(b) &&
        gridState.get(a) === gridState.get(c)
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>{winner ? `Winner: ${winner}` : `Player Turn: ${playerTurn}`}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "450px",
          gap: "0",
        }}
      >
        {Array.from({ length: GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "150px",
              height: "150px",
              border: "1px solid grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "50px",
              cursor: winner ? "not-allowed" : "pointer",
              background: winner ? "#ddd" : "white",
            }}
            onClick={() => handleGridClicked(index)}
          >
            {clickedGrids.get(index)}
          </div>
        ))}
      </div>

      {winner && (
        <button
          style={{
            marginTop: "20px",
            padding: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            setClickedGrids(new Map());
            setPlayerTurn(PLAYER_1);
            setWinner(null);
          }}
        >
          Restart Game
        </button>
      )}
    </div>
  );
};
