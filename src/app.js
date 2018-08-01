import { AppRoot } from "./components/AppRoot";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <AppRoot options={["Learn React", "Watch Video", "Make Something"]} />,
  document.getElementById("app")
);
