import { useState } from "react";
export default function List({ items, onDeleteItem, onToggleItem,onClearList }) {
  const [sortBy, setSortBy] = useState("input")

  let sortedItem;
  if (sortBy === "input") sortedItem = items
  if (sortBy === "description") sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === "packed") sortedItem = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))



  return <div className='list'>
    <ul>
      {sortedItem?.map((el) => <Item item={el} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />)}
    </ul>

    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="input">Sort by input</option>
      <option value="description">Sort by description</option>
      <option value="packed">Sort by packed</option>
      
    </select>
     <button onClick={onClearList}>clearList</button>

   
  </div>
}