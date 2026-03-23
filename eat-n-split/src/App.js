import { useState } from 'react';
import './App.css';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [openFrom, setFormOpen] = useState(false)
  const [frindList, setFriendList] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  console.log("selectedFriend", selectedFriend)

  function handleAddFriend(friend) {
    setFriendList((friends) => [...friends, friend])
    setFormOpen(false)
  }

  function handleForm(e) {
    setFormOpen((show) => !show)
  }

  function handleSplitBill(value) {
    console.log("abchh", value)
    setFriendList(
      (friends) =>
        friends.map((f) => f.id === selectedFriend.id ? { ...f, balance: f.balance + value } : f))

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList friends={frindList} onSelectFriend={setSelectedFriend} />
        {openFrom && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleForm}>{openFrom ? "close" : "Add"}</Button>
      </div>
      {selectedFriend && <SplitForm selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  );
}

function FriendList({ friends, onSelectFriend }) {
  return <ul>{friends.map((friend) => {
    return <li>
      <Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend} />
    </li>
  })}</ul>

}

function Friend({ friend, onSelectFriend }) {
  return <>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    <p className={friend.balance === 0 ? 'gray' : friend.balance < 0 ? 'red' : 'green'}>
      {friend.balance === 0 ? `You and ${friend.name} are even` : friend.balance < 0 ? `You owe ${friend.name} ${Math.abs(friend.balance)}$` : `${friend.name} owes you ${friend.balance}$`}
    </p>
    <Button onClick={() => onSelectFriend(friend)}>Select</Button>
  </>

}

function AddFriendForm({ onAddFriend }) {

  const [name, setName] = useState('')
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleAddFriend(e) {
    e.preventDefault()
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    }
    console.log("aslkdmnask")
    onAddFriend(newFriend)
  }

  return <form className='form-add-friend' onSubmit={handleAddFriend}>

    <label className='label'>👫Friend Name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <label className='label'>🌄 Image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.values)} />

    <Button>Add</Button>

  </form  >
}

function Button({ children, onClick }) {
  return <button className='button' onClick={onClick}>{children}</button>
}

function SplitForm({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("")
  const [expense, setExpense] = useState("")
  const [whoIsPaying, setWhoisPaying] = useState("user")
  const friendExpense = expense !== "" ? Number(billValue) - Number(expense) : Number(billValue)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("friendExpense", friendExpense)
    onSplitBill(whoIsPaying === "user" ? friendExpense : -expense)
  }

  return <form className='form-split-bill' onSubmit={handleSubmit}>
    <h2>Split a Bill with {selectedFriend.name}</h2>

    <label className='label'>💰 Bill values</label>
    <input type="number" value={billValue} onChange={(e) => setBillValue(e.target.value)} />

    <label className='label'>🤓Your expense</label>
    <input type="number" value={expense} onChange={(e) => setExpense(e.target.value)} />


    <label className='label'>👫Clark Expense</label>
    <input type="number" disabled value={expense ? billValue - expense : billValue} />

    <label className='label'>🤑Who is paying the bill</label>
    <select value={whoIsPaying} onChange={(e) => setWhoisPaying(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">Clark</option>
    </select>

    <Button>Split bill</Button>
  </form>
}

export default App;
