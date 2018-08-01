import { Header } from "./components/Header";
import { Action } from "./components/Action";
import { Options } from "./components/Options";
import React from "react";
import ReactDOM from "react-dom";
import AddOption from "./components/AddOption";

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
    try {
      const json = localStorage.getItem("options");
      const loadedOptions = JSON.parse(json);
      console.log(loadedOptions);
      if (loadedOptions) {
        this.setState(() => {
          return { options: loadedOptions };
        });
      }
      console.log("Options loaded.");
    } catch (e) {
      console.log("Error in loading the options.");
    }
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

ReactDOM.render(
  <App options={["Learn React", "Watch Video", "Make Something"]} />,
  document.getElementById("app")
);
