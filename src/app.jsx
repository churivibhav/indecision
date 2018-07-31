class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleRemoveOne = this.handleRemoveOne.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.state = {
      decision: undefined,
      options: ["Learn React", "Watch Video", "Make Something"]
    };
  }

  handleAddOption(option) {
    if (!option) {
      return "Enter a valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option is already present";
    }
    this.setState(prevState => {
      return {
        options: [...prevState.options, option]
      };
    });
  }

  handleRemoveAll() {
    console.log("remove all");
    this.setState(() => {
      return {
        options: []
      };
    });
  }

  handleRemoveOne(option) {
    this.setState(prevState => {
      return {
        options: prevState.options.filter(o => o !== option)
      };
    });
  }

  handlePick() {
    this.setState(state => {
      const randomNumber = Math.round(Math.random() * state.options.length);
      return {
        decision: state.options[randomNumber - 1]
      };
    });
  }

  render() {
    return (
      <div>
        <Header title="Indesicion" subtitle="Put your life in hands of a computer!" />
        <Action
          hasOptions={this.state.options.length > 0}
          onPick={this.handlePick}
          decision={this.state.decision}
        />
        <Options
          options={this.state.options}
          onRemoveAll={this.handleRemoveAll}
          onRemoveOne={this.handleRemoveOne}
        />
        <AddOption onAddOption={this.handleAddOption} />
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
  render() {
    return (
      <div>
        <button onClick={this.props.onPick} disabled={!this.props.hasOptions}>
          What should I do?
        </button>
        <div>{this.props.decision}</div>
      </div>
    );
  }
}
class Option extends React.Component {
  render() {
    return (
      <div>
        {this.props.option} <a onClick={this.props.onRemove}>[Remove]</a>
      </div>
    );
  }
}

class Options extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.options.length}</p>
        <button onClick={this.props.onRemoveAll}>Remove All</button>
        <ul>
          {this.props.options.map(o => (
            <li key={o}>
              <Option option={o} onRemove={() => this.props.onRemoveOne(o)} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleAddOption(e) {
    e.preventDefault();
    const value = e.target.option.value.trim();
    const error = this.props.onAddOption(value);
    if (!!error) {
      alert(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option" />
        <button>Add</button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
