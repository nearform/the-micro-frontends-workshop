import * as React from 'react';

const LayoutBox = ({ children }) => {
  return (
    <div
      style={{
        background: 'cadetblue',
        width: '90%',
        height: '100vh',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        margin: "auto"
      }}
    >
      { children }
    </div>
  );
};

export default LayoutBox;
