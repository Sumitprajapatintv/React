import { useState } from "react"
export default function Stats({ items }) {

  if (!items.length) {
    return <footer className='stats'>
      <em>You are ready for Packing</em>
    </footer>
  }

  const length = items.length
  const packed = items.filter((el) => el.packed).length
  const packedPersentage = Math.round((packed / length) * 100)



  return <footer className='stats'>
    {packedPersentage === 100 ? `You are ready to go ✈️` : `You have ${length} item on your list ,and you already packed ${packed} item ${packedPersentage}%`}
  </footer>
}
