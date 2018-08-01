import React from "react";

export const Action = props => {
  return (
    <div>
      <button onClick={props.onPick} disabled={!props.hasOptions}>
        What should I do?
      </button>
      <div>{props.decision}</div>
    </div>
  );
};
