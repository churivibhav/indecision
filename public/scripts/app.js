"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
    _this.handleRemoveOne = _this.handleRemoveOne.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentDidUpdate = _this.componentDidUpdate.bind(_this);
    _this.state = {
      decision: undefined,
      options: props.options
    };
    return _this;
  }

  // Lifecycle method


  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem("options");
        var loadedOptions = JSON.parse(json);
        console.log(loadedOptions);
        if (loadedOptions) {
          this.setState(function () {
            return { options: loadedOptions };
          });
        }
        console.log("Options loaded.");
      } catch (e) {
        console.log("Error in loading the options.");
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem("options", json);
        console.log("Options saved.");
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log("App unmounted.");
    }

    // Event Handlers

  }, {
    key: "handleAddOption",
    value: function handleAddOption(option) {
      if (!option) {
        return "Enter a valid value to add item";
      } else if (this.state.options.indexOf(option) > -1) {
        return "This option is already present";
      }
      this.setState(function (prevState) {
        return {
          options: [].concat(_toConsumableArray(prevState.options), [option])
        };
      });
    }
  }, {
    key: "handleRemoveAll",
    value: function handleRemoveAll() {
      console.log("remove all");
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: "handleRemoveOne",
    value: function handleRemoveOne(option) {
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (o) {
            return o !== option;
          })
        };
      });
    }
  }, {
    key: "handlePick",
    value: function handlePick() {
      this.setState(function (state) {
        var randomNumber = Math.round(Math.random() * state.options.length);
        return {
          decision: state.options[randomNumber - 1]
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: "Indesicion", subtitle: "Put your life in hands of a computer!" }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          onPick: this.handlePick,
          decision: this.state.decision
        }),
        React.createElement(Options, {
          options: this.state.options,
          onRemoveAll: this.handleRemoveAll,
          onRemoveOne: this.handleRemoveOne
        }),
        React.createElement(AddOption, { onAddOption: this.handleAddOption })
      );
    }
  }]);

  return App;
}(React.Component);

App.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: "ABC",
  subtitle: "DEFG"
};

var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.onPick, disabled: !props.hasOptions },
      "What should I do?"
    ),
    React.createElement(
      "div",
      null,
      props.decision
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    props.option,
    " ",
    React.createElement(
      "a",
      { onClick: props.onRemove },
      "[X]"
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      props.options.length
    ),
    props.options.length == 0 && React.createElement(
      "p",
      null,
      "Please add options to get started."
    ),
    React.createElement(
      "button",
      { onClick: props.onRemoveAll },
      "Remove All"
    ),
    React.createElement(
      "ul",
      null,
      props.options.map(function (o) {
        return React.createElement(
          "li",
          { key: o },
          React.createElement(Option, { option: o, onRemove: function onRemove() {
              return props.onRemoveOne(o);
            } })
        );
      })
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    return _this2;
  }

  _createClass(AddOption, [{
    key: "handleAddOption",
    value: function handleAddOption(e) {
      e.preventDefault();
      var value = e.target.option.value.trim();
      var error = this.props.onAddOption(value);
      if (!!error) {
        alert(error);
      } else {
        e.target.option.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.handleAddOption },
        React.createElement("input", { type: "text", name: "option" }),
        React.createElement(
          "button",
          null,
          "Add"
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(App, { options: ["Learn React", "Watch Video", "Make Something"] }), document.getElementById("app"));
