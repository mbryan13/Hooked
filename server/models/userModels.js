const mongoose = require('mongoose');

// console.log('progressionModels.js');
// const MONGO_URI = 'mongodb+srv://mbryan13:sGfmF1CELMjEjazB@cluster0.huspugc.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: 'soloproject'
// })
//     .then(() => console.log('Connected to Mongo DB.'))
//     .catch(err => console.log(err));

const Schema = mongoose.Schema;


//favorites - object of 
const userSchema = new Schema({
    username: { type: String, required: true },
    favorites: [{ progression: String, description: String, qualities: Array, key: String }],
    chordQualities: Array
})

const User = mongoose.model('users', userSchema);

module.exports = User;
