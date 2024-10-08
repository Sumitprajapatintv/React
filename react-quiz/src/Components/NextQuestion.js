import React from 'react'

export default function NextQuestion({ dispatch, answer }) {
  if (answer === null) return;
  return (
    <div>
      <button className='btn btn-ui' onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
    </div>
  )
}
