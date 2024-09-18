
import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 6 };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((cur) => {
      return { count: cur.count - 1 }
    })
  }
  handleIncrement() {
    this.setState((cur) => {
      return { count: cur.count + 1 }
    })
  }


  render() {
    return <div>
      <button onClick={this.handleDecrement}>-</button>
      <span>{this.state.count}</span>
      <button onClick={this.handleIncrement}>+</button>
    </div>
  }
}

export default App;