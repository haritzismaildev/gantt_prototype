import logo from './logo.svg';
import './App.css';
import React from 'react';
import GanttChart from './GanttChart';

function App() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h3>Project Management Prototype</h3>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GanttChart />
      </header>
    </div>
  );
}

export default App;
