const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../passport/passport');

const router = express.Router();

// JWT Login
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user,
            });
        }
        res.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            // create signed json web token with contents of user object and return in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            console.log(token);
            return res.json({ user, token });
        });
    })(req, res);
    res.redirect('/blog/posts');
});

module.exports = router;
