import "./App.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const [rangeval, setRangeval] = useState(1);
  const date = new Date();
  date.setDate(date.getDate() + count);

  // function incrementStep() {
  //   setStep((s) => s + 1);
  // }
  // function decrementStep() {
  //   setStep((s) => s - 1);
  // }
  function handleReset() {
    setCount(0);
    setRangeval(1);
  }
  function incrementCount() {
    setCount((c) => c + step);
  }
  function decrementCount() {
    setCount((c) => c - step);
  }
  return (
    <div className="main">
      <div className="input-section">
        {/* <div className="step-section">
        <button onClick={decrementStep}>-</button>
        <p>{`Step :${step}`}</p>
        <button onClick={incrementStep}>+</button>
      </div> */}
        <input
          type="range"
          className="custom-range"
          min="0"
          max="10"
          onChange={(event) => setRangeval(Number(event.target.value))}
        />
        <p>{rangeval}</p>
      </div>
      <div className="counter">
        <button onClick={() => setCount((c) => c - rangeval)}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={() => setCount((c) => c + rangeval)}>+</button>
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
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
