const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const apiRouter = require(path.resolve(__dirname, 'routes/hookApi.js'));
app.use(express.json());

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));
app.use('/hookApi', apiRouter);
app.post('/create')
app.get('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); //listens on port 3000 -> http://localhost:3000/
