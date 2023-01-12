// handles requests to mongoDB
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
require('isomorphic-fetch');

router.get('/:username', UserController.getFavorites, (req, res) => res.status(200).json({ favorites: res.locals.favorites }))
router.patch('/:username', UserController.addFavorite, (req, res) => res.sendStatus(200));

module.exports = router;