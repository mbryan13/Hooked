const Progression = require('../models/progression.js');

const ProgressionController = {
    createProgression(req, res, next) {
        console.log('createProgression middleware invoked');
        next();
    }
}

module.exports = ProgressionController;