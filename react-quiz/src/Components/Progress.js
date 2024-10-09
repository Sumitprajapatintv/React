import React from 'react'

export default function Progress({ index, noOfQuestion, points, totalPoitns, answer }) {
  return (
    <header className='progress'>
      <progress max={noOfQuestion} value={index + Number(answer !== null)}></progress>
      <p>Question <strong>{index + 1}</strong> / {noOfQuestion} </p>

      <p>{points} / {totalPoitns} Points</p>
    </header>
  )
}
