import React from "react";
import "./App.css";
import QuestionPicker from "./components/QuestionPicker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LeetCode Question Picker</h1>
        <QuestionPicker />
      </header>
    </div>
  );
}

export default App;
