import * as React from 'react';

const Nav = ({ links }) => {
  return (
    <nav
      style={{
        background: "#fb7a9c",
        width: "100%",
        color: "white",
        textAlign: "center",
        display: "block"
      }}
    >
      <ul>
        { links.map((link, i) => (
          <li key={i} style={{display: "inline-block", padding: "10px 20px" }}>
            <a style={{color: "#120048"}} href={link.url}>{link.label}</a>
          </li> )
          )
        }
      </ul>
    </nav>
  );
};

export default Nav;
