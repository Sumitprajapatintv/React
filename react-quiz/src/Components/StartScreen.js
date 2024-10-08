import React from 'react'

export default function StartScreen({ noOfQuestion, dispatch }) {
  return (
    <div className='start'>
      <h2>Welcome to the React Quiz</h2>
      <h3>{noOfQuestion} questions to test your react mastery</h3>
      <button className='btn' onClick={() => dispatch({ type: "start" })}>Let`s start</button>
    </div>
  )
}
