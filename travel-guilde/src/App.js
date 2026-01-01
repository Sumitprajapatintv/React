import { useState } from 'react';
import './App.css';
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Shoes", quantity: 3, packed: true },
  { id: 2, description: "Bat", quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems)

  console.log("itm",items)
  const handleItems = (item) => {
    setItems((e) => [...e, item])
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleFrom={handleItems}/>
      <List items={items}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <div>
    <h1>😊Far Away z🌲</h1>
  </div>

}
function Form({onHandleFrom}) {
  const [description, setDescription] = useState("")
  const [quantity, setquantity] = useState(10)

  function handleSubmit(e) {
    e.preventDefault()
    const obj = {
      description, quantity, packed: false, id: Date.now()
    }
    onHandleFrom(obj)
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

function List({items}) {
  console.log("hws",items)
  return <div className='list'>
    <ul>{items?.map((el) => <Item item={el} />)}</ul>
  </div>
}

function Stats() {
  return <footer className='stats'>
    <em>You have x item on your list ,and you already packed x (x%)</em>
  </footer>
}

function Item({ item }) {
  return (<li>
    <span className={
      item.packed ? "packed" : ""}>
      {item.quantity} {item.description}
    </span>
    <button>❌</button>
  </li>)
}

export default App;
