import "../App.css";
import Header from "./Header";
import Main from "./Main";
import { useReducer, useEffect } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return { ...state, status: "start", secondRemaining: state.questions.length * 30  };
    }
    case "newAnswer": {
      return { ...state, answer: action.payload };
    }
    case "nextQuestion": {
      const question = state.questions[state.index];
      return {
        ...state,
        index: state.index + 1,
        points:
          state.points +
          (state.answer === question.correctOption ? question.points : 0),
        answer: null,
      };
    }
    case "finished": {
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.highscore, state.points),
        answer: null,
      };
    }
    case "tick": {
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    }
    case "restart": {
      return {
        ...state,
        status: "start",
        index: 0,
        points: 0,
        answer: null,
        secondRemaining: 10,
      };
    }
  }
}

function App() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondRemaining: 10,
  };
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestion = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  
  // dispatch()

  console.log("answer", answer);
  useEffect(function () {
    async function fetchData(params) {
      fetch("http://localhost:9000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataRecieved", payload: data }))
        .catch((error) => {
          dispatch({ type: "dataFailed", payload: error });
          console.log(error);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <Start numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status == "start" && (
          <>
            {" "}
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
          </>
        )}
        <NextButton
          answer={answer}
          dispatch={dispatch}
          numQuestion={numQuestion}
          index={index}
        />
      </Main>
      <Footer>
        {status == "start" && <Timer secondRemaining={secondRemaining} dispatch={dispatch} />}
        {status == "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Footer>
    </div>
  );
}

export default App;
