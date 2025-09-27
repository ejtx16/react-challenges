import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex gap-4 flex-col items-center justify-center h-screen">
      <div className="flex gap-4 flex-wrap justify-center max-w-2xl">
        <Link to="/rock-paper-scissors" className="bg-blue-500 text-white p-4 rounded-md">
          Rock Paper Scissors
        </Link>
        <Link to="/stop-watch" className="bg-blue-500 text-white p-4 rounded-md">
          Stop Watch
        </Link>
        <Link to="/dice" className="bg-blue-500 text-white p-4 rounded-md">
          Dice
        </Link>
        <Link to="/traffic-lights" className="bg-blue-500 text-white p-4 rounded-md">
          Traffic Lights
        </Link>
        <Link to="/random-qoutes" className="bg-blue-500 text-white p-4 rounded-md">
          Random Qoutes
        </Link>
        <Link to="/gradient" className="bg-blue-500 text-white p-4 rounded-md">
          Gradient
        </Link>
        <Link to="/xox" className="bg-blue-500 text-white p-4 rounded-md">
          XOX
        </Link>
        <Link to="/whack-a-mole" className="bg-blue-500 text-white p-4 rounded-md">
          Whack A Mole
        </Link>
        <Link to="/quizes" className="bg-blue-500 text-white p-4 rounded-md">
          Quizes
        </Link>
        <Link to="/expenses" className="bg-blue-500 text-white p-4 rounded-md">
          Expenses
        </Link>
        <Link to="/calculator" className="bg-blue-500 text-white p-4 rounded-md">
          Calculator
        </Link>
        <Link to="/hangman" className="bg-blue-500 text-white p-4 rounded-md">
          Hangman
        </Link>
        <Link to="/password-generator" className="bg-blue-500 text-white p-4 rounded-md">
          Password Generator
        </Link>
        <Link to="/page-splitter" className="bg-blue-500 text-white p-4 rounded-md">
          Page Splitter
        </Link>
        <Link to="/tree-browser" className="bg-blue-500 text-white p-4 rounded-md">
          Tree Browser
        </Link>
      </div>
    </div>
  );
}
