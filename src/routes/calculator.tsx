import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ca } from "zod/v4/locales";

export const Route = createFileRoute("/calculator")({
  component: Calculator,
});

type Operation = "+" | "-" | "*" | "/" | "=";
type Input = number | Operation;

function Calculator() {
  const [input, setInput] = useState("");
  const inputsRef = useRef<Input[]>([]);

  function handleAppendNumber(value: string) {
    console.log("=== value calculator.tsx [20] ===>", value);

    setInput(input + value);
  }

  function calculate(num1: number, operator: Operation, num2: number): number {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
      default:
        return 0;
    }
  }

  function handleOperations(operation: Operation) {
    inputsRef.current.push(parseFloat(input));
    inputsRef.current.push(operation);

    if (inputsRef.current.length >= 3) {
      const [num1, op, num2] = inputsRef.current.splice(0, 3) as [number, Operation, number];
      const result = calculate(num1, op, num2);

      setInput(result.toString());

      if (operation === "=") {
        inputsRef.current = []; // Clear everything after final calculation
      } else {
        inputsRef.current.push(result); // Store result for chained operations
      }
    } else if (operation !== "=") {
      setInput(""); // Clear input for next number
    }

    console.log("=== inputsRef calculator.tsx [25] ===>", inputsRef.current);
  }

  // function handleOperations(value: string, operation: string) {
  //   setInput({ value: value, operation: operation });
  //   setInputs([...inputs, { value: value, operation: operation }]);
  // }

  // function handleCalculate() {
  //   const result = eval(input.value);
  //   setInput({ value: result.toString(), operation: "" });
  //   setInputs([...inputs, { value: result.toString(), operation: "" }]);
  // }
  // function setInputValue(value: string, operation: string) {
  //   setInput({ value: value, operation: input.operation });
  //   setInputs([...inputs, { value: value, operation: input.operation }]);
  // }

  // function calculate() {
  // }

  console.log("===  calculator.tsx [17] ===>", input);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-4xl font-bold border-2 border-gray-300 rounded-md p-2">{input}</div>

        <div className="flex flex-row items-center justify-center gap-4">
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleAppendNumber("9")}>
            9
          </button>
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleAppendNumber("10")}>
            10
          </button>
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleOperations("+")}>
            +
          </button>
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleOperations("-")}>
            -
          </button>
          {/* <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleOperations({ value: input.value, operation: "-" })}>-</button>
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleOperations({ value: input.value , operation: "*" })}>*</button>
          <button className="border-2 border-gray-300 rounded-md p-2 size-10" onClick={() => handleOperations({ value: input.value, operation: "/" })}>/</button> */}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleOperations("=")}>
          =
        </button>
      </div>
    </div>
  );
}
