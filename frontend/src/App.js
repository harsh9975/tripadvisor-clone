import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{width:'100vw'}}>
      <Header/>
      <div style={{paddingTop:'70px'}}>
      <Home/>
      </div>
      
    </div>
  );
}

export default App;
