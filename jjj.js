const express = require('express');
const app = express();
const PORT = 4100;
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/todos', (req, res) => {
    const filePath = path.resolve(__dirname, 'db.json');
    try {
        const data = fs.readFileSync(filePath);
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addTodo', (req, res) => {
    try {
        const { name, status } = req.body;

        const filePath = path.resolve(__dirname, 'db.json');
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);
        const newId = parsedData.todos.length + 1;
        const newTodo = { id: newId, name, status: Boolean(status) }; // Ensure status is boolean
        parsedData.todos.push(newTodo);

        fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateTodo/:id', (req, res) => {
    try {
        const { id } = req.params;
        const filePath = path.resolve(__dirname, 'db.json');
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data);

        // Convert id from string to number for comparison
        const numericId = Number(id);

        // Find the todo with the given id
        const todo = parsedData.todos.find((todo) => todo.id === numericId);

        if (todo && numericId % 2 === 0 && todo.status === false) {
            // Update the status to true if conditions are met
            todo.status = true;
            fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));
            res.json(todo);
        } else {
            res.status(400).json({ msg: 'Todo not found, is not even, or status is not false.' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
