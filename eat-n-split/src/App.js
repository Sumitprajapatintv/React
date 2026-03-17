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

  function handleForm(e) {
    setFormOpen((show) => !show)
  }
  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList />
        {openFrom && <AddFriendForm />}
        <Button onClick={handleForm}>{openFrom ? "close" : "Add"}</Button>
      </div>

    </div>
  );
}

function FriendList() {
  const friends = initialFriends
  return <ul>{friends.map((friend) => {
    return <li>
      <Friend key={friend.id} friend={friend} />
    </li>
  })}</ul>

}

function Friend({ friend }) {
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    <p className={friend.balance < 0 ? 'red' : 'green'}>
      {friend.balance < 0 ? `You owe ${friend.name} ${Math.abs(friend.balance)}$` : `${friend.name} owes you ${friend.balance}$`}
    </p>
    <Button>Select</Button>
  </li>

}

function AddFriendForm({ }) {
  return <form className='form-add-friend'>

    <label className='label'>👫Friend Name</label>
    <input type="text" />

    <label className='label'>🌄 Image URL</label>
    <input type="text" />


    <Button>Add</Button>

  </form  >
}

function Button({ children, onClick }) {
  return <button className='button' onClick={onClick}>{children}</button>
}

export default App;
