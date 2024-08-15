
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use(express.static('public'));

let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// Read: Get all items
app.get('/', (req, res) => {
    res.render('index',{items});
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id == id);
    if (index !== -1) {
        items[index] = { id: Number(id), ...updatedItem };
        res.json(items[index]);
    } else {
        res.status(404).send('Item not found');
    }
});


app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id != id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
