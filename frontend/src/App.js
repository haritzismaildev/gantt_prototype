// import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import GanttChart from './GanttChart';
// //import GanttChartDetailed from './GanttChartDetailed';

// function App() {
//   return (
//     <div className="App" style={{ padding: "20px" }}>
//       <h3>Project Management Prototype</h3>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <GanttChart />
//         {/* <GanttChartDetailed /> */}
//       </header>
//     </div>
//   );
// }

import React from 'react';
import './index.css';
import GanttChart from './GanttChart';

function App() {
  return (
    <div>
      <GanttChart />
    </div>
  );
}

export default App;
