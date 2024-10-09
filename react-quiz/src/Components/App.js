import '../index.css'
import Main from './Main';
import Header from './Header'
import { useEffect, useReducer } from 'react';
import Loader from './Loader'
import Error from './Error';
import StartScreen from './StartScreen'
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
const intialState = {
  questions: [],
  status: "Loding",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
}
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "Error" }
    case "start":
      return { ...state, status: "active" }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload == question.correctOption ? state.points + question.points : state.points
      }
    case "finished":
      return { ...state, status: "finished", highScore: state.points > state.highScore ? state.points : state.highScore }

    case "nextQuestion":

      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case "restart":
      return {
        ...intialState, questions: state.questions, status: "ready"
      }
    default:
      throw new Error("Action Unknown")
  }
}
function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(reducer, intialState);

  console.log("points", points);

  const noOfQuestion = questions.length;

  const totalPoitns = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0)

  useEffect(function () {
    fetch("http://localhost:9000/questions").then((res) => res.json()).
      then((data) => dispatch({ type: "dataRecived", payload: data })).
      catch((err) => dispatch({ type: "dataFailed" }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {console.log("Status", status)}
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && <StartScreen noOfQuestion={noOfQuestion} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress index={index} noOfQuestion={noOfQuestion} points={points} totalPoitns={totalPoitns} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextQuestion index={index} noOfQuestion={noOfQuestion} dispatch={dispatch} answer={answer} />
          </>
        }
        {status === "finished" && <FinishScreen dispatch={dispatch} points={points} maxPoints={totalPoitns} highScore={highScore} />}
      </Main>
    </div>
  );
}

export default App;
