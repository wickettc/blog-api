const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('../models/user');

passport.use(
    new LocalStrategy((username, password, cb) =>
        User.findOne({ username, password })
            .then((user) => {
                if (!user) {
                    return cb(null, false, {
                        message: 'Incorrect username or password.',
                    });
                }

                return cb(null, user, {
                    message: 'Logged In Successfully',
                });
            })
            .catch((err) => cb(err))
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        (jwtPayload, cb) =>
            User.findOneById(jwtPayload.id)
                .then((user) => cb(null, user))
                .catch((err) => cb(err))
    )
);
