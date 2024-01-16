import React from "react";
import Content from "./components/content.js";
import Header from "./components/header.js";

export default function App() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Header />
      <Content />
    </div>
  );
}