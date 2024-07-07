import { useState } from "react";
import Item from "./../components/Item.js";

export function PackingList({ items, onDelteItem, onToggleItem, onClearList }) {
  const [sortBy, setsortBY] = useState("input");
  let sortedItems = [...items];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    console.log("paked");
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <li>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onDelteItem={onDelteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </li>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBY(e.target.value)}>
          <option value="input">Sort By input Order</option>
          <option value="description">Sort By description</option>
          <option value="packed">Sort By pakedItem</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
