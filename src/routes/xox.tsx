import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/xox")({
  component: XOX,
});

function XOX() {
  const [gameBoard, setGameBoard] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O" | "">("X");
  const [status, setStatus] = useState<"playing" | "winner" | "tie" | null>("playing");

  useEffect(() => {
    checkWinner();
  }, [gameBoard]);

  const handleClick = (row: number, col: number) => {
    if (gameBoard[row][col] !== "" || status !== "playing") return;
    setGameBoard((prevBoard) => {
      const newBoard = [...prevBoard.map((row) => [...row])];
      newBoard[row][col] = currentPlayer;
      return newBoard;
    });
    console.log("=== gameBoard xox.tsx [29] ===>", gameBoard);
    setCurrentPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    console.log("=== currentPlayer xox.tsx [31] ===>", currentPlayer);
    checkWinner();
  };

  const checkWinner = () => {
  
    let winner = checkRows() || checkColumns() || checkDiagonals() || checkTie();

    console.log("===  xox.tsx [30] ===>", winner);
    if (winner) {
      alert("winner" + winner);
      setCurrentPlayer(winner as "X" | "O");
      setStatus("winner");
      setGameBoard([["", "", ""], ["", "", ""], ["", "", ""]]);
      setCurrentPlayer("X");
      setStatus("playing");
    }

    return winner;
  };

  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      const row = gameBoard[i];
      if (row.every((cell) => cell === row[0] && cell !== "")) {
        return row[0];
      }
    }
    return null;
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      const column = gameBoard.map((row) => row[i]);
      if (column.every((cell) => cell === column[0] && cell !== "")) {
        return column[0];
      }
    }
    return null;
  };

  const checkDiagonals = () => {
    const diagonal1 = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
    const diagonal2 = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];
    if (
      diagonal1.every((cell) => cell === diagonal1[0] && cell !== "") ||
      diagonal2.every((cell) => cell === diagonal2[0] && cell !== "")
    ) {
      return diagonal1[0] || diagonal2[0];
    }
    return null;
  };

  const checkTie = () => {
    if (gameBoard.flat().every((cell) => cell !== "")) {
      return "tie";
    }
    return null;
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
        {status === "winner" && <p>Winner: {currentPlayer}</p>}
        {status === "tie" && <p>Tie</p>}
          {gameBoard.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {row.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="flex w-10 h-10 bg-gray-200 rounded-md items-center justify-center cursor-pointer"
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {col}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
