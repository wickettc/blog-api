const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
require('dotenv').config();

const User = require('../models/user');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            // need to check if password is correct here
            // if (!user.verifyPassword(password)) return done(null, false)
            return done(null, user);
        });
    })
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },

        async (token, done) =>{
            try {
                return done(null, token.user)
            } catch (err) {
                done(err)
            }}
    )
);
