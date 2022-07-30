import React from "react";
const styles = {
  marginBottom: "0px",
  color: "#fff",
  textAlign: "center",
};

const TittleApp = ({ children, loading }) => {
  return (
    <header>
      <h1 style={styles}>Todo List</h1>
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

export { TittleApp };
