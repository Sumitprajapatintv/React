import "./App.css";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDelteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌲Far Away 💼</h1>;
}
function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const item = { description, count, paked: false, id: Date.now() };
    onAddItem(item);
    setDescription("");
    setCount(1);
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
function PackingList({ items, onDelteItem, onToggleItem }) {
  return (
    <div className="list">
      <li>
        {items.map((item) => {
          return (
            <Item
              item={item}
              key={item}
              onDelteItem={onDelteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </li>
    </div>
  );
}
function Item({ item, onDelteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.count} {item.description}
      </span>
      <button onClick={() => onDelteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="footer">
        <em>Please Add Item</em>
      </footer>
    );
  }
  const numLength = items.length;
  const pakedItem = items.filter((el) => el.packed).length;
  const persentage = Math.round((pakedItem / numLength) * 100);
  return (
    <footer className="footer">
      <em>
        {persentage !== 100
          ? `You hava ${numLength} item in your list You have already packed
        ${pakedItem}
        ${persentage} %`
          : `All Ready Just Go Now ✈️`}
      </em>
    </footer>
  );
}
