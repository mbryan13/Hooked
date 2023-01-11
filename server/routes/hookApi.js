// handle requests to HookTheory API
const express = require('express');
const router = express.Router();
require('isomorphic-fetch');

const queryHookApi = (req, res, next) => {
    console.log(`https://api.hooktheory.com/v1/trends/nodes?cp=${req.query.cp}`);
    fetch(`https://api.hooktheory.com/v1/trends/nodes?cp=${req.query.cp}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ba6ed46c6f50997c5a1aff77e3d154a6'
        }
    })
        .then(response => response.json())
        .then(response => {
            res.locals.chords = response;
            next();
        })
        .catch(e => console.log(e));
}

router.get('/', queryHookApi, (req, res) => res.status(200).setHeader("Access-Control-Allow-Origin", "*").json({ chords: res.locals.chords }));


module.exports = router;
