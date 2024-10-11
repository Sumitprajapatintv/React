import React from 'react'

export default function FinishScreen({ questions, dispatch, points, maxPoints, highScore }) {
  const persentage = points / maxPoints * 100;
  let emoji;
  if (persentage === 100) emoji = "🏆";
  if (persentage < 100 && persentage > 50) emoji = "🎉";
  if (persentage < 50 && persentage > 30) emoji = "💪";
  if (persentage < 30 && persentage > 0) emoji = "✨";

  return (
    <div>
      <p className='result'>{emoji}You Score {points} out of {maxPoints} ({Math.ceil(persentage)}%)</p>
      <p className='highscore'>(HighScore:{highScore} points)</p>
      <button className='btn' onClick={() => dispatch({ type: "restart" })}>Re-start Quiz</button>
    </div>
  )
}
