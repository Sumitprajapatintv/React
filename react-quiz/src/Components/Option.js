import React from 'react'

export default function Option({ question, dispatch, answer }) {
  console.log("Answer", answer);
  const hasAnswer = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button className={`btn btn-option ${index == answer ? "answer" : ""} ${hasAnswer ? index === question.correctOption ? "correct" : "wrong" : ""} `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
