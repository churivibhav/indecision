import { Header } from "./Header";
import { Action } from "./Action";
import { Options } from "./Options";
import React from "react";
import AddOption from "./AddOption";

export class AppRoot extends React.Component {
  state = {
    decision: undefined,
    options: props.options
  };

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  // Event Handlers
  // Lambda functions get this from parent scope, no need to rebind this
  handleAddOption = option => {
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
  };
  handleRemoveAll = () => {
    console.log("remove all");
    this.setState(() => {
      return {
        options: []
      };
    });
  };
  handleRemoveOne = option => {
    this.setState(prevState => {
      return {
        options: prevState.options.filter(o => o !== option)
      };
    });
  };
  handlePick = () => {
    this.setState(state => {
      const randomNumber = Math.round(Math.random() * state.options.length);
      return {
        decision: state.options[randomNumber - 1]
      };
    });
  };

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
AppRoot.defaultProps = {
  options: []
};
