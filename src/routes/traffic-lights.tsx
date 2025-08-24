import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/traffic-lights")({
  component: TrafficLights,
});
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";

const RED_TIME = 5000;
const GREEN_TIME = 5000;
const YELLOW_TIME = 1000;

function TrafficLights() {
  const [enabled, setEnabled] = useState("");
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    if (enabled === RED) {
      timeout = setTimeout(() => {
        setEnabled(GREEN);
      }, RED_TIME);
    } else if (enabled === GREEN) {
      
      timeout = setTimeout(() => {
        setEnabled(YELLOW);
      }, GREEN_TIME);
    } else if (enabled === YELLOW) {
      setTimeout(() => {
        setEnabled(RED);
      }, YELLOW_TIME);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [enabled]);

  return (
    <div className="flex flex-col items-center justify-center">
      {enabled}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`w-20 h-20 bg-red-500 rounded-full ${enabled === RED ? "opacity-100" : "opacity-50"}`}></div>
        <div className={`w-20 h-20 bg-green-500 rounded-full ${enabled === GREEN ? "opacity-100" : "opacity-50"}`}></div>
        <div className={`w-20 h-20 bg-yellow-500 rounded-full ${enabled === YELLOW ? "opacity-100" : "opacity-50"}`}></div>
      </div>
      <button className="text-md font-bold cursor-pointer bg-blue-500 text-white p-4 rounded-md mt-10" onClick={() => setEnabled(RED)}>
        Run
      </button>
    </div>
  );
}
