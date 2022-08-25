import React from "react";
const styles = {
  marginBottom: "0px",
  color: "#fff",
  textAlign: "center",
};

const TitleApp = ({ children, loading }) => {
  return (
    <header>
      <h1 style={styles}>To-Do List</h1>
      {
        React.Children
          .toArray(children)
          .map(child => (
            React.cloneElement(child, { loading: loading })
          ))
      }
    </header>
  );
}

export { TitleApp };
