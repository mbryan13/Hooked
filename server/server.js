const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://mbryan13:sGfmF1CELMjEjazB@cluster0.huspugc.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'soloproject'
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const apiRouter = require(path.resolve(__dirname, 'routes/hookApi.js'));
const favsRouter = require(path.resolve(__dirname, 'routes/favs.js'));

app.use(express.json());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, PATCH');
    return next();
});

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));
app.use('/hookApi', apiRouter);
app.use('/favs', favsRouter);
app.get('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); //listens on port 3000 -> http://localhost:3000/
