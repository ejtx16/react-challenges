import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { cidrv4 } from "zod/v4";

export const Route = createFileRoute("/stop-watch")({
  component: StopWatch,
});

type state = "initial" | "running" | "paused";

function StopWatch() {
  const [time, setTime] = useState(0);
  const [timeState, setTimeState] = useState<state>("initial");

  const timeInterval = useRef<NodeJS.Timeout | null>(null);

  function handleStart() {
    setTimeState("running");
    timeInterval.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  function handlePause() {
    setTimeState("paused");
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
    }
  }

  function handleReset() {
    setTime(0);
    setTimeState("initial");
    if (timeInterval.current) {
      clearInterval(timeInterval.current);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">{time} seconds passed </div>

      {timeState === "initial" && (
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-10" onClick={() => handleStart()}>
            Start
          </button>
        </div>
      )}

      {timeState === "running" && (
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-10" onClick={() => handlePause()}>
            Pause
          </button>
        </div>
      )}
      {timeState === "paused" && (
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-10" onClick={() => handleStart()}>
            Resume
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-10" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
