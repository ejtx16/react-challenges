import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/page-splitter")({
  component: PageSplitter,
});

function PageSplitter() {
  return (
    <div className="w-full h-screen">
      <Cell isVertical={false} />
    </div>
  );
}

function getRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

function Cell({ isVertical }: { isVertical: boolean }) {
  const [color, setColor] = useState(getRandomHexColor);
  const [cells, setCells] = useState<string[]>([]);

  function handleSplit() {
    setCells([...cells, getRandomId()]);
  }

  console.log("===  page-splitter.tsx [28] ===>", cells);

  return (
    <div className={"w-full h-full flex " + (isVertical ? "flex-col" : "flex-row")}>
      <button className="w-full h-full" style={{ backgroundColor: color }} onClick={handleSplit}>
        Split
      </button>
      {cells.map((cell) => (
        <Cell key={cell} isVertical={!isVertical} />
      ))}
    </div>
  );
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
