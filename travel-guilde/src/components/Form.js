import { useState } from "react"
export default function Form({ onHandleFrom }) {
  const [description, setDescription] = useState("")
  const [quantity, setquantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    const obj = {
      description, quantity, packed: false, id: Date.now()
    }
    onHandleFrom(obj)
    setDescription("")
    setquantity(1)

  }


  return <div>
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for Your Trip</h3>
      <select value={quantity} onChange={(e) => setquantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => <option value={el} key={el}>{el}</option>)}
      </select>

      <input type='text' placeholder='Item...' value={description} onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  </div>
}