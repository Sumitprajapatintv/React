
import React from "react";
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "London" }
    this.fetchWhether = this.fetchWhether.bind(this);
  }
  fetchWhether() {
    console.log(this);
  }

  render() {
    return <div className="app">
      <h1>Classy Whether App</h1>
      <div>
        <input
          type="text"
          placeholder="Search for Location"
          value={this.state.location}
          onChange={(e) => this.setState({ location: e.target.value })}
        />
        <button onClick={this.fetchWhether}>Get Whether</button>
      </div>
    </div>
  }
}

export default App;