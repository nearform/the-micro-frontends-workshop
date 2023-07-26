import * as React from 'react';

const LayoutBox = ({ children }) => {
  return (
    <div
      style={{
        background: "#2165e3",
        width: "90%",
        height: "100vh",
        color: "white",
        textAlign: "center",
        fontSize: "24px",
        margin: "auto",
        overflow: "hidden"
      }}
    >
      { children }
    </div>
  );
};

export default LayoutBox;
