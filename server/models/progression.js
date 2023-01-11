const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressionSchema = new Schema({
});

const Progression = mongoose.model('progression', progressionSchema);

module.exports = Progression;
