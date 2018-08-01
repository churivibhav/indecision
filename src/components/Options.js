import { Option } from "./Option";
import React from "react";

export const Options = props => {
  return (
    <div>
      <p>{props.options.length}</p>
      {props.options.length == 0 && <p>Please add options to get started.</p>}
      <button onClick={props.onRemoveAll}>Remove All</button>
      <ul>
        {props.options.map(o => (
          <li key={o}>
            <Option option={o} onRemove={() => props.onRemoveOne(o)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
