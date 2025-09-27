import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/hangman")({
  component: Hangman,
});

const WORDS = ["date", "apple", "banana", "cherry", "elderberry", "fig"];

function Hangman() {
  const [word, setWord] = useState<string>(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guessedWords, setGuessedWords] = useState<string[]>(new Array(WORDS.length).fill(""));
  const [maxGuesses, setMaxGuesses] = useState<number>(6);
  const [guess, setGuess] = useState<string>("");

  const handleGuess = () => {
    // debugger;
    setMaxGuesses((prev) => prev - 1);
    let newGuessedWords = [...guessedWords];
    newGuessedWords[word.indexOf(guess)] = guess;

    setGuessedWords(newGuessedWords);
    setGuess("");

    console.log("=== word hangman.tsx [27] ===>", word);

    if (newGuessedWords.every((letter) => letter !== "")) {
      alert("You won!");
      handleReset();
    }

    if (maxGuesses === 0) {
      alert("You lost!");
      handleReset();
    }
  };

  const handleReset = () => {
    setGuessedWords(new Array(WORDS.length).fill(""));
    setMaxGuesses(6);
    setGuess("");
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2 mt-20">
        {guessedWords.map((letter, index) => (
          <div key={index} className="bg-gray-200 p-4 w-[50px] h-[50px] border-2 border-gray-300">
            {letter}
          </div>
        ))}
      </div>
      <p className="text-center mt-10">Max guesses: {maxGuesses}</p>
      <div className="flex items-center justify-center gap-2 mt-10">
        <input
          type="text"
          className="bg-gray-200 p-2 w-200 h-10 border-gray-300 border-2 rounded-md"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleGuess}>
          Guess
        </button>
      </div>
    </>
  );
}
