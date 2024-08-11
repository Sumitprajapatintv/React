import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import StartComponenet from "./startComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StartComponenet length={10} />
    <StartComponenet length={5} color='#fa5252' size='12px' /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
