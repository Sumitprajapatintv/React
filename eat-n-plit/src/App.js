import "./App.css";
import { useState } from "react";
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
  const [friends, setAddFriends] = useState(initialFriends);
  const [showAddFrom, setShowAddFrom] = useState(true);
  const [selectedFriend, setSelectedFrined] = useState(null);

  function handleShowAddFrom() {
    setShowAddFrom((show) => !show);
  }

  function handleAddFriend(friend) {
    setAddFriends((friends) => [...friends, friend]);
    setShowAddFrom((showAddFrom) => !showAddFrom);
  }

  function handleSeletedFriend(friend) {
    setSelectedFrined((cur) => (cur?.id === friend?.id ? null : friend));
    setShowAddFrom(false);
  }

  return (
    <div className="App">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectedFrined={handleSeletedFriend}
        />
        {showAddFrom && <FromAddFeiend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFrom}>
          {showAddFrom ? "Close" : "Add Friend"}
        </Button>
      </div>
      <div>
        {selectedFriend && <FromSplitBill selectedFriend={selectedFriend} />}
      </div>
    </div>
  );
}

function FriendList({ friends, selectedFriend, onSelectedFrined }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectedFrined={onSelectedFrined}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, selectedFriend, onSelectedFrined }) {
  let isSelected = friend?.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} {friend.balance} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes You {friend.balance} $
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelectedFrined(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FromAddFeiend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!friendName || !imageUrl) return;

    const id = crypto.randomUUID();
    const friend = {
      id: id,
      name: friendName,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };
    onAddFriend(friend);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>😊Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>📷Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button className="button">Add</Button>
    </form>
  );
}

function FromSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input type="text" />

      <label>🤷‍♂️Your Expanses</label>
      <input type="text" />

      <label>👥 {selectedFriend.name} Expanses</label>
      <input type="text" />

      <label>🤦‍♂️Who is Paying bill</label>
      <select>
        <option>you </option>
        <option>{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
