import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/gradient")({
  component: GradientComponent,
});

function GradientComponent() {
  const [from, setFrom] = useState("#000000");
  const [to, setTo] = useState("#ffffff");
  const [direction, setDirection] = useState("to right");

  return (
    <div className="flex gap-12 h-screen p-12">
      <form className="flex flex-col gap-4 border-2 border-gray-300 rounded p-4">
        <label htmlFor="from">From</label>
        <input type="text" name="from" className="border-2 border-gray-300 rounded p-2" value={from} onChange={(e) => setFrom(e.target.value)} />
        <label htmlFor="to">To</label>
        <input type="text" name="to" className="border-2 border-gray-300 rounded p-2" value={to} onChange={(e) => setTo(e.target.value)} />
        <select name="direction" className="border-2 border-gray-300 rounded p-2"onChange={(e) => setDirection(e.target.value)}>
          <option value="to right">To Right</option>
          <option value="to left">To Left</option>
          <option value="to top">To Top</option>
          <option value="to bottom">To Bottom</option>
        </select>
      </form>

      <div className="flex-grow bg-green-400" style={{ background: `linear-gradient(${direction}, ${from}, ${to})` }}></div>
    </div>
  );
}
