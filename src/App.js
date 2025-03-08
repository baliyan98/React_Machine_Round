import { useState } from "react";

const WORD_TO_GUESS = "GUESS";

export default function App() {
  const [totalGuesses, setTotalGuesses] = useState([]);
  const [winner, setWinner] = useState(false);
  const [chancesOver, setChancesOver] = useState(false);

  const handleSubmit = (currentGuess) => {
    setTotalGuesses((prev) => [...prev, currentGuess]);
    if (currentGuess === WORD_TO_GUESS.toLowerCase()) {
      setWinner(true);
    }
    if (totalGuesses.length === 4) {
      setChancesOver(true);
    }
  };

  const handleUserInput = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event.target.value);
      event.target.value = "";
    }
  };

  const getBorderColor = (char, index) => {
    if (WORD_TO_GUESS.toLowerCase().charAt(index) === char) {
      return "green";
    } else if (WORD_TO_GUESS.toLowerCase().includes(char)) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <input
        onKeyDown={handleUserInput}
        disabled={winner || chancesOver}
        maxLength={5}
        style={{
          border: "1px solid grey",
          height: "20px",
          borderRadius: "5px",
          marginBottom: "30px",
        }}
      />
      <div style={{ margin: "10px" }}>
        {totalGuesses.map((currentGuess, index) => {
          return (
            <div
              key={index}
              style={{
                display: "grid",
                gap: "2px",
                gridTemplateColumns: "repeat( 5, 1fr)",
              }}
            >
              {Array.from({ length: currentGuess.length }).map((_, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      textAlign: "center",
                      paddingTop: "15%",
                      height: "30px",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      backgroundColor: getBorderColor(
                        currentGuess.charAt(index),
                        index
                      ),
                    }}
                  >
                    {currentGuess.charAt(index)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {winner && (
        <div style={{ color: "green" }}>
          Congratulations!!! You have guess it correctly
        </div>
      )}
      {chancesOver && (
        <div style={{ color: "red" }}>
          Sorry!! You have used all your chances
        </div>
      )}
    </div>
  );
}
