import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/whack-a-mole")({
  component: WhackAMole,
});

function WhackAMole() {
  const [holes, setHoles] = useState<boolean[]>([true, false, false]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const handleClick = (index: number) => {
    setHoles((prev) => {
      const newHoles = [...prev];
      newHoles[index] = false;
      console.log("=== newHoles whack-a-mole.tsx [17] ===>", newHoles);
      return newHoles;
    });
    if (holes[index]) {
      setScore((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHoles((prev) => {
        const newHoles = [...prev];
        newHoles[Math.floor(Math.random() * newHoles.length)] = true;
        return newHoles;
      });
      setTimeLeft((prev) => prev - 1);
      console.log("=== timeLeft whack-a-mole.tsx [30] ===>", timeLeft);
    }, 1000);
    if (timeLeft === 0) {
      alert("Time's up! You scored " + score + " points");
      setTimeLeft(0);
      setScore(0);
      setHoles([false, false, false]);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div>
      Hello "/whack-a-mole"!
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-row items-center justify-center gap-4">
          <p>Score: {score}</p>
          <p>Time left: {timeLeft} seconds</p>
          {holes.map((hole, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 m-10 size-24"
              onClick={() => handleClick(index)}
            >
              {hole ? "🐭" : ""}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
