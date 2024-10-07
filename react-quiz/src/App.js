import './index.css'
import Main from './Main';
import Header from './Header'
import { useEffect, useReducer } from 'react';
const intialState = {
  questions: [],

  status: "Loding"
}
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "ready" }
    default:
      throw new Error("Action Unknown")
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, intialState);


  useEffect(function () {
    fetch("http://localhost:9000/questions").then((res) => res.json()).
      then((data) => dispatch({ type: "dataRecived", payload: data })).
      catch((err) => dispatch({ type: "dataFailed" }))
  })
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/10</p>
        <p>Question...</p>
      </Main>
    </div>
  );
}

export default App;
