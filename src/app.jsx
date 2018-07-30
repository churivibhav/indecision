console.log("Starting app");
const app = {
  title: "Indecision",
  subtitle: "Put your life in the hands of a computer",
  options: ["One", "Two"]
};

function getOptions(options) {
  let jsx;
  for (const option of options) {
    jsx += <li>{option}</li>;
  }
  return jsx;
}

const template = (
  <div>
    <h3>{app.title}</h3>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options && app.options.length > 0 ? "Here are your options" : "No Options"}</p>
    {getOptions(app.options)}
  </div>
);
ReactDOM.render(template, document.getElementById("app"));
