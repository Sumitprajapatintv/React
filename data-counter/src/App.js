import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);

  function incrementStep() {
    setStep((s) => s + 1);
  }
  function decrementStep() {
    setStep((s) => s - 1);
  }
  function incrementCount() {
    setCount((c) => c + step);
  }
  function decrementCount() {
    setCount((c) => c - step);
  }
  return (
    <div className="main">
      <div className="step-section">
        <button onClick={decrementStep}>-</button>
        <p>{`Step :${step}`}</p>
        <button onClick={incrementStep}>+</button>
      </div>
      <div className="counter">
        <button onClick={decrementCount}>-</button>
        <p>{`Count :${count}`}</p>
        <button onClick={incrementCount}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? `today is ${date.toDateString()}`
            : count > 0
            ? `${count} days from today is ${date.toDateString()}`
            : `${count} days ago from today is ${date.toDateString()}`}
        </span>
      </p>
    </div>
  );
}

export default App;
