const User = require('../models/userModels.js');

const UserController = {
    getFavorites(req, res, next) {
        console.log('getFavorites middleware invoked');
        const { username } = req.params;
        User.findOne({ username })
            .then(response => {
                res.locals.favorites = response.favorites;
                return next();
            })
            .catch(e => console.log(e))
    },

    async addFavorite(req, res, next) {
        console.log('addFavorite middleware invoked');
        const { username } = req.params;
        const user = await User.findOne({ username });
        const newFavorites = [...user.favorites, req.body];
        user.favorites = newFavorites;
        user.save()
            .then(response => next())
            .catch(e => console.log(e));
    },

    addUser(req, res, next) {
        console.log('addUser middleware invoked');
        User.create({ username: 'mbryan13' })
            .then(res => {
                return next();
            })
            .catch(e => console.log(e));
    }
}

module.exports = UserController;