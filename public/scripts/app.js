"use strict";

console.log("Starting app");
var app = {
  title: "Indecision",
  subtitle: "Put your life in the hands of a computer",
  options: ["One", "Two"]
};

function getOptions(options) {
  var jsx = void 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var option = _step.value;

      jsx += React.createElement(
        "li",
        null,
        option
      );
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return jsx;
}

var template = React.createElement(
  "div",
  null,
  React.createElement(
    "h3",
    null,
    app.title
  ),
  app.subtitle && React.createElement(
    "p",
    null,
    app.subtitle
  ),
  React.createElement(
    "p",
    null,
    app.options && app.options.length > 0 ? "Here are your options" : "No Options"
  ),
  getOptions(app.options)
);
ReactDOM.render(template, document.getElementById("app"));
