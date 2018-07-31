class App extends React.Component {
  constructor() {
    super();
    this.options = [];
  }

  handleOption(e) {
    e.preventDefault();
    alert("handleOption");
  }

  render() {
    return (
      <div>
        <Header title="Indesicion" subtitle="Put your life in hands of a computer!" />
        <Action />
        <Options options={this.options} />
        <AddOption onAddOption={this.handleOption} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  handlePick() {
    alert("handlepick");
  }
  render() {
    return (
      <div>
        <button onClick={this.handlePick}>What should I do?</button>
      </div>
    );
  }
}
class Option extends React.Component {
  render() {
    return <div>{this.props.option}</div>;
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this); // bind is needed to get 'this' in the method
  }

  handleRemoveAll() {
    alert("removeall");
  }
  render() {
    return (
      <div>
        <p>{this.props.options.length}</p>
        <button onClick={this.handleRemoveAll}>Remove All</button>
        <ul>
          {this.props.options.map(o => (
            <li key={o}>
              <Option option={o} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class AddOption extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onAddOption}>
        <input type="text" name="option" />
        <button>Add</button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
