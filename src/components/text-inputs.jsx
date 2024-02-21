import React from "react";
// This function is for creating input fields components
function TextInputs({ title, state, setState }) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        placeholder={title}
      />
    </React.Fragment>
  );
}
export default TextInputs;
