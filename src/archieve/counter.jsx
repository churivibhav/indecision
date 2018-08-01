class CounterApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      count: 0
    };
  }
  handleAdd() {
    //preferred way to use lambda in setState
    this.setState(prevState => {
      return { count: prevState.count + 1 };
    });
  }
  handleRemove() {
    // old way, pass object with changed properties, discouraged
    this.setState({ count: this.state.count - 1 });
  }
  handleReset() {
    this.setState({
      count: 0
    });
  }
  render() {
    return (
      <div>
        <h1>Count : {this.state.count} </h1>
        <button onClick={this.handleAdd}>+1</button>
        <button onClick={this.handleRemove}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
ReactDOM.render(<CounterApp />, document.getElementById("app"));
