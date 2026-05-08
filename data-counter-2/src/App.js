import "./App.css";
import { useState, useReducer } from "react";
function reducer(state, action) {
  console.log("state", state, action);
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step};
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error("Something is Wrong");
  }
}

function App() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const date = new Date();
  date.setDate(date.getDate() + state.count);

  console.log("step",state.step)

  // console.log("count", s);

  // function incrementStep() {
  //   setStep((s) => s + 1);
  // }
  // function decrementStep() {
  //   setStep((s) => s - 1);
  // }
  function handleReset() {
    dispatch(1);
  }
  function incrementCount() {
    dispatch({ type: "inc" });
  }
  function decrementCount() {
    dispatch({ type: "dec" });
  }

  function setCount(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function setStep(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
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
          onChange={(event) => setStep(event)}
        />
        <p>{state.step}</p>
      </div>
      <div className="counter">
        <button onClick={decrementCount}>-</button>
        <input type="text" value={state.count} onChange={(e) => setCount(e)} />
        <button onClick={incrementCount}>+</button>
      </div>

      <p>
        <span>
          {state.count === 0
            ? `today is ${date.toDateString()}`
            : state.count > 0
              ? `${state.count} days from today is ${date.toDateString()}`
              : `${state.count} days ago from today is ${date.toDateString()}`}
        </span>
      </p>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
