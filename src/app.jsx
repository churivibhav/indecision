class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleRemoveOne = this.handleRemoveOne.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {
      decision: undefined,
      options: props.options
    };
  }

  // Lifecycle method
  componentDidMount() {
    const json = localStorage.getItem("options");
    const loadedOptions = JSON.parse(json);
    console.log(loadedOptions);
    if (loadedOptions) {
      this.setState(() => {
        return { options: loadedOptions };
      });
    }
    console.log("Options loaded.");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("Options saved.");
    }
  }

  componentWillUnmount() {
    console.log("App unmounted.");
  }

  // Event Handlers
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

App.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
};

Header.defaultProps = {
  title: "ABC",
  subtitle: "DEF"
};

const Action = props => {
  return (
    <div>
      <button onClick={props.onPick} disabled={!props.hasOptions}>
        What should I do?
      </button>
      <div>{props.decision}</div>
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.option} <a onClick={props.onRemove}>[X]</a>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <p>{props.options.length}</p>
      <button onClick={props.onRemoveAll}>Remove All</button>
      <ul>
        {props.options.map(o => (
          <li key={o}>
            <Option option={o} onRemove={() => props.onRemoveOne(o)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleAddOption(e) {
    e.preventDefault();
    const value = e.target.option.value.trim();
    e.target.option.value = "";
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

ReactDOM.render(
  <App options={["Learn React", "Watch Video", "Make Something"]} />,
  document.getElementById("app")
);
