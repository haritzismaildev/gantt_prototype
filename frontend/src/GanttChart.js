import React, { useEffect, useState } from 'react';

export default function GanttChart() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3006/api/tasks')
        .then((res) => res.json())
        .then((data) => setTasks(data))
        .catch((err) => console.error(err));
    }, []);

    // menghitung durasi tugas (dalam 1 hari)
    const calculateDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    };
    
    return (
        <div>
            <h2>Gantt Chart Prototype</h2>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                        <th>Duration (days)</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.start}</td>
                            <td>{task.end}</td>
                            <td>{task.description}</td>
                            <td>{calculateDuration(task.start, task.end)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}