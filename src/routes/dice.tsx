import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/dice")({
  component: Dice,
});

function Dice() {
  const [diceNumber, setDiceNumber] = useState<number | undefined>(undefined);
  const handleRoll = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1; 
    setDiceNumber(randomNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Dice</div>
      <div className="flex gap-4 flex-col items-center justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-10" onClick={handleRoll}>
          Roll
        </button>
        {diceNumber !== undefined && <DiceNumber diceNumber={diceNumber} />}
      </div>
    </div>
  );
}

function DiceNumber({ diceNumber }: { diceNumber: number }) {
  return (
    <div className="flex items-center justify-center bg-gray-200 rounded-md size-24 gap-4 p-4">
      {diceNumber === 1 && (
        <div className="flex flex-col items-center justify-center bg-gray-200 h-20 w-full">
          <div className="bg-black rounded-full size-8"></div>
        </div>
      )}
      {diceNumber === 2 && (
        <div className="flex flex-col items-center justify-center bg-gray-200 h-20 w-full gap-2 p-4">
          <div className="bg-black rounded-full size-4"></div>
          <div className="bg-black rounded-full size-4"></div>
        </div>
      )}
      {diceNumber === 3 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full flex items-start justify-start">
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="w-full flex items-end justify-end">
            <div className="bg-black rounded-full size-4"></div>
          </div>
        </div>
      )}
      {diceNumber === 4 && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="flex gap-2">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
        </div>
      )} 
       {diceNumber === 5 && (
        <div className="flex flex-col gap-2 items-center justify-center p-4">
          <div className="flex gap-4">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="flex gap-4">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
        </div>
      )} 
          {diceNumber === 6 && (
        <div className="flex flex-row gap-2 items-center justify-center p-4">
          <div className="flex flex-col gap-2">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
            <div className="bg-black rounded-full size-4"></div>
          </div>
        </div>
      )} 
    </div>
  );
}
