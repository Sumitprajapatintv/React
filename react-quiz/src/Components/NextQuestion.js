import React from 'react'

export default function NextQuestion({ index, noOfQuestion, dispatch, answer }) {
  if (answer === null) return;
  if (index < noOfQuestion - 1) {
    return (
      <div>
        <button className='btn btn-ui' onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
      </div>
    )
  }
  if (index == noOfQuestion - 1) {
    return (
      <div>
        <button className='btn btn-ui' onClick={() => dispatch({ type: "finished" })} >Finish</button>
      </div>
    )
  }

}
