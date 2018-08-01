import React from "react";

export default class AddOption extends React.Component {
  handleAddOption = e => {
    e.preventDefault();
    const value = e.target.option.value.trim();
    const error = this.props.onAddOption(value);
    if (!!error) {
      alert(error);
    } else {
      e.target.option.value = "";
    }
  };

  render() {
    return (
      <form onSubmit={this.handleAddOption}>
        <input type="text" name="option" />
        <button>Add</button>
      </form>
    );
  }
}
