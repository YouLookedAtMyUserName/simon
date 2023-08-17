import logo from './logo.svg';
import './App.css';
import Squares from "./Squares.js"
import {UseEffect, UseState} from "react";

function App() {
  const GameName = "Simon";
  const Style = {"color" : "rgb(255, 0, 0)"}
  return (
    <div className="App">
      <h1 style = {Style}> {GameName} </h1>
      <Squares></Squares>
    </div>
  );
}

export default App;