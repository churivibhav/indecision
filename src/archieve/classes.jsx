console.log("Starting app");
const app = {
  title: "Indecision",
  subtitle: "Put your life in the hands of a computer",
  options: ["One", "Two"],
  decision: undefined
};

function getOptions(options) {
  return <ul>{options.map(o => <li key={o}>{o}</li>)}</ul>;
}

function onFormSubmit(e) {
  e.preventDefault();
  const option = e.target.option.value;
  app.options.push(option);
  render();
}

function onReset() {
  // To remove all items in an array,
  // we splice the array from start to finish
  // leaving ourselves with an empty array
  app.options.splice(0, app.options.length);
  render();
}

function onMakeDecision() {
  const randomNumber = Math.round(Math.random() * app.options.length);
  app.decision = app.options[randomNumber - 1];
  render();
}

function render() {
  const template = (
    <div>
      <h3>{app.title}</h3>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options && app.options.length > 0 ? "Here are your options" : "No Options"}</p>
      {getOptions(app.options)}
      <button onClick={onMakeDecision}>What should I do? </button>
      <p>{app.decision}</p>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add</button>
      </form>
      <button onClick={onReset}>Remove All</button>
    </div>
  );
  ReactDOM.render(template, document.getElementById("app"));
}

render();
