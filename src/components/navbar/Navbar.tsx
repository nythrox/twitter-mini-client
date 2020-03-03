import React from "react";
export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        position: "sticky",
        top: "0",
        padding: 10,
        borderBottom: "1px solid rgb(56, 68, 77)",
        zIndex: 90,
        backgroundColor: "rgb(17, 27, 36)"
      }}
    >
      <h3
        style={{
          color: "white"
        }}
      >
        Home
      </h3>
    </nav>
  );
}
