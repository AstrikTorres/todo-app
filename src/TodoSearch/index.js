import React from "react";
import { TodoContext } from "../TodoContext";

const inputWrapper = {
  position: "relative",
  width: "200px",
};

const input = {
  marginBottom: "14px",
  color: "black",
  height: "28px",
  width: "200px",
  border: "none",
  borderRadius: "20px",
  padding: "15px",
  outline: "none",
};

const inputIcon = {
  color: "black",
  height: "20px",
  width: "20px",
  position: "absolute",
  top: "5px",
  right: "10px",
  Transform: "translateY(-50%)",
};

function TodoSearch({ searchValue, setSearchValue }) {

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div style={inputWrapper}>
      <input
        style={input}
        type={"search"}
        placeholder="Search"
        value={searchValue}
        onChange={onSearchValueChange}
      />
      <svg xmlns="http://www.w3.org/2000/svg" style={inputIcon} viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
      </svg>
    </div>
  );
}

export { TodoSearch };