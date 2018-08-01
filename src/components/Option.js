import React from "react";
export const Option = props => {
  return (
    <div>
      {props.option} <a onClick={props.onRemove}>[X]</a>
    </div>
  );
};
