const express = require('express');
const cors = require('cors');
const app = express();
const port = 3006;

app.use(cors());
app.use(express.json());

// sementara kita gunakan data dummy dahulu
let tasks = [
    {id: 1, name: 'Task 1', start: "2025-06-01", end: "2025-06-05", description: 'Description 1'},
    {id: 2, name: 'Task 2', start: "2025-06-03", end: "2025-06-08", description: 'Description 2'},
    {id: 3, name: 'Task 3', start: "2025-06-05", end: "2025-06-10", description: 'Description 3'},
];

// Endpoint untuk mendapatkan daftar tugas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint untuk menambah tugas baru
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});