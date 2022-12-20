const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            // console.log(profile)             //If we do Console of 'profile',it will print the- id,displayName,lastname,photos(as a string value),& this will print only when we click the google account after login
            //now we have to matchup this all things with the 'userSchema'
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({ googleId: profile.id })      //it checks if the 'User' is present in the Database or not,

                if (user) {           //if the user already exist in the Database
                    done(null, user)    //Here 'null' for the error  

                } else {
                    user = await User.create(newUser)     //if the user' doesn't present in the Database then it create new user in the Database
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }))



    passport.serializeUser((user, done) => {     //Passport uses serializeUser function to persist(carry on) user data (after successful authentication) into session.
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {    //Function deserializeUser is used to retrieve(bring back) user data from session.
        User.findById(id, (err, user) => done(err, user))
    })

    //The user id (you provide as the second argument of the done function) is saved in the session
    // and is later used to retrieve the whole object via the deserializeUser function.
}