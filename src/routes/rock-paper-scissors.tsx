import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HandFist, StickyNote, Scissors } from "lucide-react";
import { useState } from "react";


export const Route = createFileRoute("/rock-paper-scissors")({
  component: RockPaperScissors,
});

type playerChoice = "rock" | "paper" | "scissors";
const aiChoices = ["rock", "paper", "scissors"];

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<playerChoice | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [gameState, setGameState] = useState<string | null>("playing");

  const handlePlayerChoice = (choice: playerChoice) => {
    setPlayerChoice(choice);
    const randomIndex = Math.floor(Math.random() * aiChoices.length);
    const randomChoice = aiChoices[randomIndex];
    console.log("AI choice:", randomChoice);
    setAiChoice(randomChoice);
    setGameState("done");
  };

  const getResult = () => {
    if (playerChoice === aiChoice) {
      return "tie";
    } else if (playerChoice === "rock" && aiChoice === "scissors") {
      return "win";
    } else if (playerChoice === "paper" && aiChoice === "rock") {
      return "win";
    } else if (playerChoice === "scissors" && aiChoice === "paper") {
      return "win";
    } else {
      return "lose";
    }
  };

  const handlePlayAgain = () => {
    setPlayerChoice(null);
    setAiChoice(null);
    setGameState("playing");
  };

  return (
    <>
      {gameState === "playing" ? (
        <div className="flex flex-col gap-8 justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-center">Pick your choice!</h1>
          <div className="flex gap-8 justify-center items-center mt-10">
            <button
              className="flex flex-col justify-center items-center p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 h-44 w-44"
              onClick={() => handlePlayerChoice("rock")}
            >
              <HandFist className="size-10" />
              Rock
            </button>
            <button
              className="flex flex-col justify-center items-center p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 h-44 w-44"
              onClick={() => handlePlayerChoice("paper")}
            >
              <StickyNote className="size-10" />
              Paper
            </button>
            <button
              className="flex flex-col justify-center items-center p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 h-44 w-44"
              onClick={() => handlePlayerChoice("scissors")}
            >
              <Scissors className="size-10" />
              Scissors
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-2xl font-bold">You chose {playerChoice}</p>
          <p className="text-2xl font-bold">The AI chose {aiChoice}</p>
          <p className="text-2xl font-bold mt-10">You {getResult()}!</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-10" onClick={() => handlePlayAgain()}>
            Play again
          </button>
        </div>
      )}
    </>
  );
}
