import "./App.css";
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
  return (
    <div className="add-from">
      <h3>What do you need for your 😊 trip</h3>
    </div>
  );
}
function PackingList() {
  return (
    <div className="list">
      <li>
        {initialItems.map((item) => {
          return <Item item={item} />;
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
