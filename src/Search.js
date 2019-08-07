import React from "react";

// Functional Stateless component or Presentational component
// Controlled component - since value of the input is controlled from parent component
const Search = ({ value, onChange, onSubmit, children }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">{children}</button>
    </form>
  </div>
);

export default Search;
