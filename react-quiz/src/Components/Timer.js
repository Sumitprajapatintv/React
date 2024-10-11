import { useEffect } from "react";

function Timer({ dispatch, secoundRemaing }) {

  console.log("secoundRemaing", secoundRemaing);
  const mins = Math.floor(secoundRemaing / 60);
  const seconds = secoundRemaing % 60;


  console.log("min", mins);
  console.log("seconds", seconds)

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;