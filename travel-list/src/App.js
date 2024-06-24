import "./App.css";
import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 4, description: "Changer", quantity: 1, packed: true },
  { id: 5, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌲Far Away 💼</h1>;
}
function Form() {
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const item = { description, count, paked: false, id: Date.now() };
    setDescription("");
    setCount("");
  }
  return (
    <form className="add-from" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip</h3>
      <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <li>
        {initialItems.map((item) => {
          return <Item item={item} key={item} />;
        })}
      </li>
    </div>
  );
}
function Item({ item }) {
  // console.log("item", item);
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="footer">
      <em>You hava X item in your list You have already packed X(X%)</em>
    </footer>
  );
}
