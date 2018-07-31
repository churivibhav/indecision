console.log("Starting app");
const app = {
  title: "Indecision",
  subtitle: "Put your life in the hands of a computer",
  options: ["One", "Two"]
};

function getOptions(options) {
  return <p>{options.length}</p>;
}

function onFormSubmit(e) {
  e.preventDefault();
  const option = e.target.option.value;
  app.options.push(option);
  render();
}

function render() {
  const template = (
    <div>
      <h3>{app.title}</h3>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options && app.options.length > 0 ? "Here are your options" : "No Options"}</p>
      {getOptions(app.options)}
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add</button>
      </form>
    </div>
  );
  ReactDOM.render(template, document.getElementById("app"));
}

render();
