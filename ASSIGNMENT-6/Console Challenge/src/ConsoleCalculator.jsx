import { useEffect } from "react";
import "./ConsoleCalculator.css";

// Basic calculator operations as separate functions.
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

function ConsoleCalculator() {
  // Sample values used for all operations.
  const a = 20;
  const b = 5;

  // Runs all operations once when the component is loaded.
  const logAllOperations = () => {
    console.log(`Add: ${a} + ${b} = ${add(a, b)}`);
    console.log(`Subtract: ${a} - ${b} = ${subtract(a, b)}`);
    console.log(`Multiply: ${a} * ${b} = ${multiply(a, b)}`);
    console.log(`Divide: ${a} / ${b} = ${divide(a, b)}`);
  };

  // Log sample outputs once when the component mounts.
  useEffect(() => {
    logAllOperations();
  }, []);

  return (
    <div className="calculator-card">
      <h1>Console Calculator</h1>
      <p>Open browser console to view results.</p>

      <div className="button-row">
        <button onClick={() => console.log(`Add: ${a} + ${b} = ${add(a, b)}`)}>
          Add
        </button>
        <button
          onClick={() =>
            console.log(`Subtract: ${a} - ${b} = ${subtract(a, b)}`)
          }
        >
          Subtract
        </button>
        <button
          onClick={() =>
            console.log(`Multiply: ${a} * ${b} = ${multiply(a, b)}`)
          }
        >
          Multiply
        </button>
        <button onClick={() => console.log(`Divide: ${a} / ${b} = ${divide(a, b)}`)}>
          Divide
        </button>
      </div>
    </div>
  );
}

export default ConsoleCalculator;
