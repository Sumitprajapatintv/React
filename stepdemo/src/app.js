import "./app.css";
import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setisOpen] = useState(true);
  // const [test, setTest] = useState({ name: "Jonas" });
  function handlePrevious() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setTest({ name: "freed" });
    }
  }
  return (
    <>
      <button className="close" onClick={() => setisOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="container">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          {/* <p className="message">
            Step {step} : {messages[step - 1]}
          </p> */}
          <StepMessage className="message" step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button textColor="#f8f9fa" backgroudColor="#da77f2" handlefunction={handlePrevious} >Previous</Button >
            <Button textColor="#f8f9fa" backgroudColor="#da77f2" handlefunction={handleNext} >Next</Button >
          </div>

        </div >
      )
      }
    </>
  );
}
function StepMessage({ className, step, children }) {
  return <div className={className}>
    Step:{step} {children}
  </div>
}

function Button({ btn, handlefunction, textColor, backgroudColor, children }) {
  return <button style={{ color: textColor, backgroundColor: backgroudColor }} onClick={handlefunction} > {children}</button >
}

