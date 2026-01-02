import { useState } from 'react';
import './App.css';
import Logo from './components/Logo';
const initialItems = [
];

function App() {
  const [items, setItems] = useState(initialItems)

  const handleItems = (item) => {
    setItems((e) => [...e, item])
  }

  const handleToggle = (id) => {
    setItems(items => items.map((el) => el.id === id ? { ...el, packed: !el.packed } : el))
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((el) => el.id !== id))
  }

  const clearList = () => {
    setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onHandleFrom={handleItems} />
      <List items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggle} onClearList={clearList}/>
      <Stats items={items} />
    </div>
  );
}




export default App;
