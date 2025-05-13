import React, { useEffect, useState } from 'react';
import './GanttChartDetailed.css';

// Helper untuk memformat tanggal (format: "DD MMM YYYY")
const formatDate = (date) => {
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = date.toLocaleString("default", { month: "short" });
  const yyyy = date.getFullYear();
  return `${dd} ${mm} ${yyyy}`;
};

export default function GanttChartDetail() {
  // Base height dinamis: 4% dari tinggi layar (minimal 30px)
  const baseHeight = typeof window !== "undefined" ? Math.max(30, window.innerHeight * 0.04) : 40;
  
  const [zoom, setZoom] = useState(80);
  const dayWidth = zoom;

  const timelineStart = new Date("2025-06-04");
  const timelineEnd   = new Date("2025-06-30");
  const todayDate = new Date("2025-06-15");

  const diffDays = (start, end) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((end - start) / msPerDay);
  };

  const timelineDays = [];
  for (let d = new Date(timelineStart); d <= timelineEnd; d.setDate(d.getDate() + 1)) {
    timelineDays.push(new Date(d));
  }

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const dummyTasks = [
      {
        id: 1,
        taskName: "Task 1",
        description: "Deskripsi Task 1",
        subTasks: [
          {
            subTaskName: "Subtask 1.1",
            start: "2025-06-04",
            end: "2025-06-07",
            assignedTo: [{ name: "PIC 1", photoUrl: "https://via.placeholder.com/40?text=PIC+1" }],
            color: "#4CAF50"
          },
          {
            subTaskName: "Subtask 1.2",
            start: "2025-06-08",
            end: "2025-06-10",
            assignedTo: [
              { name: "PIC 2", photoUrl: "https://via.placeholder.com/40?text=PIC+2" },
              { name: "PIC 4", photoUrl: "https://via.placeholder.com/40?text=PIC+4" }
            ],
            color: "#2196F3"
          },
          {
            subTaskName: "Subtask 1.3",
            start: "2025-06-11",
            end: "2025-06-13",
            assignedTo: [
              { name: "PIC 3", photoUrl: "https://via.placeholder.com/40?text=PIC+3" },
              { name: "PIC 5", photoUrl: "https://via.placeholder.com/40?text=PIC+5" }
            ],
            color: "#FFC107"
          }
        ]
      },
      {
        id: 2,
        taskName: "Task 2",
        description: "Deskripsi Task 2",
        subTasks: [
          {
            subTaskName: "Subtask 2.1",
            start: "2025-06-04",
            end: "2025-06-08",
            assignedTo: [{ name: "PIC 1", photoUrl: "https://via.placeholder.com/40?text=PIC+1" }],
            color: "#9C27B0"
          },
          {
            subTaskName: "Subtask 2.2",
            start: "2025-06-09",
            end: "2025-06-12",
            assignedTo: [
              { name: "PIC 2", photoUrl: "https://via.placeholder.com/40?text=PIC+2" },
              { name: "PIC 4", photoUrl: "https://via.placeholder.com/40?text=PIC+4" }
            ],
            color: "#64B5F6"
          },
          {
            subTaskName: "Subtask 2.3",
            start: "2025-06-13",
            end: "2025-06-16",
            assignedTo: [
              { name: "PIC 3", photoUrl: "https://via.placeholder.com/40?text=PIC+3" },
              { name: "PIC 5", photoUrl: "https://via.placeholder.com/40?text=PIC+5" }
            ],
            color: "#4CAF50"
          }
        ]
      },
      {
        id: 3,
        taskName: "Task 3",
        description: "Deskripsi Task 3",
        subTasks: [
          {
            subTaskName: "Subtask 3.1",
            start: "2025-06-05",
            end: "2025-06-09",
            assignedTo: [{ name: "PIC 1", photoUrl: "https://via.placeholder.com/40?text=PIC+1" }],
            color: "#FFC107"
          },
          {
            subTaskName: "Subtask 3.2",
            start: "2025-06-10",
            end: "2025-06-13",
            assignedTo: [
              { name: "PIC 2", photoUrl: "https://via.placeholder.com/40?text=PIC+2" },
              { name: "PIC 4", photoUrl: "https://via.placeholder.com/40?text=PIC+4" }
            ],
            color: "#FF9800"
          },
          {
            subTaskName: "Subtask 3.3",
            start: "2025-06-14",
            end: "2025-06-18",
            assignedTo: [
              { name: "PIC 3", photoUrl: "https://via.placeholder.com/40?text=PIC+3" },
              { name: "PIC 5", photoUrl: "https://via.placeholder.com/40?text=PIC+5" }
            ],
            color: "#8BC34A"
          }
        ]
      }
    ];
    setTasks(dummyTasks);
  }, []);

  const rows = [];
  tasks.forEach(task => {
    // Main row: hitung timeline gabungan dari semua sub task (min start dan max end)
    const subStarts = task.subTasks.map(st => new Date(st.start));
    const subEnds = task.subTasks.map(st => new Date(st.end));
    const mainStart = new Date(Math.min(...subStarts));
    const mainEnd = new Date(Math.max(...subEnds));
    rows.push({ type: 'main', task, start: mainStart, end: mainEnd });
    task.subTasks.forEach((subTask) => {
      rows.push({ type: 'sub', task, subTask, start: new Date(subTask.start), end: new Date(subTask.end) });
    });
  });

  const getRowHeight = (row) => row.type === "main" ? baseHeight : baseHeight * 3;

  const renderProgressBarForRow = (row) => {
    const timelineWidth = timelineDays.length * dayWidth;
    const rowHeight = getRowHeight(row);
    const isMain = row.type === "main";

    const barHeight = isMain ? rowHeight * 0.5 : rowHeight * 0.358;
    const barTop = isMain ? (rowHeight - barHeight) / 2 : 0;
    
    // Pilih segmen timeline berdasarkan tipe row:
    const segStart = row.start;
    const segEnd = row.end;
    const segX = diffDays(timelineStart, segStart) * dayWidth;
    const segWidth = (diffDays(segStart, segEnd) + 1) * dayWidth;
    
    // Hitung achieved width berdasarkan todayDate
    let achievedWidth = 0;
    if (todayDate <= segStart) {
      achievedWidth = 0;
    } else if (todayDate >= segEnd) {
      achievedWidth = segWidth;
    } else {
      achievedWidth = diffDays(segStart, todayDate) * dayWidth;
    }
    const notAchievedWidth = segWidth - achievedWidth;
    
    // Tentukan warna bar: untuk main row, gunakan warna dari subTask pertama;
    // untuk sub row, gunakan warna dari subTask itu sendiri.
    // const barColor = row.type === "main" ? row.task.subTasks[0].color : row.subTask.color;
    const barColor = row.type === "main" ? row.task.subTasks[0].color : row.subTask.color;
    
    return (
      <div style={{ position: 'relative', width: timelineWidth, height: rowHeight }}>
        {/* Background bar penuh */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: barTop,
          width: timelineWidth,
          height: barHeight,
          backgroundColor: "#e0e0e0",
          borderRadius: 3
        }}></div>
        {/* Bagian achieved */}
        <div style={{
          position: 'absolute',
          left: segX,
          top: barTop,
          width: achievedWidth,
          height: barHeight,
          backgroundColor: barColor,
          borderRadius: 3
        }}></div>
        {/* Bagian not achieved */}
        <div style={{
          position: 'absolute',
          left: segX + achievedWidth,
          top: barTop,
          width: notAchievedWidth,
          height: barHeight,
          backgroundColor: barColor,
          opacity: 0.4,
          borderRadius: 3
        }}></div>
      </div>
    );
  };

  return (
    <div className="gantt-chart-container">
      {/* Header Proyek dan Tab Navigasi */}
      <div className="project-header">
        <h1><td>Product Launch</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>
        <select id="status_project" name='status_project'>
          <option value="On Track">On Track</option>
          <option value="At Risk">At Risk</option>
          <option value="Off Track">Off Track</option>
        </select>
          </td></h1>
        {/* <div className="project-status">On Track</div> */}
      </div>
      
      {/* this is for the tabs refference */}
      {/* <div className="project-tabs">
        {["Gantt Chart", "Board", "List", "Calendar", "Workload", "People", "Dashboard"].map((tab, idx) => (
          <button key={idx} className="tab-btn">{tab}</button>
        ))}
      </div> */}
      
      {/* Kontrol Zoom */}
      <div className="chart-controls">
        <div className="zoom-controls">
          <button onClick={() => setZoom(z => Math.min(z + 10, 120))}>Zoom In</button>
          <button onClick={() => setZoom(z => Math.max(z - 10, 20))}>Zoom Out</button>
        </div>
      </div>
      
      <div className="gantt-chart-grid">
        {/* Panel Kiri: Task Name & Assigned (PIC hanya tampil di row sub) */}
        <div className="gantt-left-panel">
          <div className="gantt-detail-header">
            <div className="task-name">Task Name</div>
            <div className="assigned">Assigned</div>
          </div>
          <div className="gantt-details">
            {rows.map((row, i) => (
              <div key={i} className="gantt-details-row" style={{ height: getRowHeight(row) }}>
                {row.type === "main" ? (
                  <>
                    <div className="task-name-col">
                      <div className="task-name-text">{row.task.taskName}</div>
                      <div className="task-description">{row.task.description}</div>
                    </div>
                    <div className="assigned-col">{/* Main row tidak tampilkan PIC */}</div>
                  </>
                ) : (
                  <>
                    <div className="task-name-col">
                      <div className="task-name-text" style={{ paddingLeft: '20px' }}>
                        {row.subTask.subTaskName}
                      </div>
                    </div>
                    <div className="assigned-col">
                      {row.subTask.assignedTo.map((person, idx) => (
                        <img key={idx} src={person.photoUrl} alt={person.name} className="assigned-img" />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Panel Kanan: Timeline */}
        <div className="gantt-right-panel">
          <div className="timeline-header">
            {timelineDays.map((date, index) => (
              <div key={index} className="timeline-day">
                {formatDate(date)}
              </div>
            ))}
            <div className="today-indicator" style={{ left: diffDays(timelineStart, todayDate) * dayWidth }}></div>
          </div>
          <div className="timeline-bar-container">
            {rows.map((row, i) => (
              <div key={i} className="timeline-bar-row" style={{ height: getRowHeight(row) }}>
                {renderProgressBarForRow(row)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}