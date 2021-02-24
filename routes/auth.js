const express = require('express');
require('dotenv').config();

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'something did not work' });
        }
        req.login(user, { session: false }, (error) => {
            if (error) res.send(error);
            const token = jwt.sign({ user }, process.env.SECRET, {
                expiresIn: '1d',
            });
            return res.json({ user, token });
        });
    })(req, res);
});

module.exports = router;
