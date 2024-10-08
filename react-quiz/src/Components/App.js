import '../index.css'
import Main from './Main';
import Header from './Header'
import { useEffect, useReducer } from 'react';
import Loader from './Loader'
import Error from './Error';
import StartScreen from './StartScreen'
import Question from './Question';
import NextQuestion from './NextQuestion';
const intialState = {
  questions: [],
  status: "Loding",
  index: 0,
  answer: null,
  points: 0,
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
    case "nextQuestion":

      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    default:
      throw new Error("Action Unknown")
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, intialState);

  console.log("points", points);

  const noOfQuestion = questions.length;

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
        {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
        <NextQuestion dispatch={dispatch} answer={answer} />
      </Main>
    </div>
  );
}

export default App;
