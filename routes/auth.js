const express = require('express')
const passport = require('passport')
const router = express.Router()

//@Description - Authenticate with Google
//@route   GET /auth/google
router.get('/google', passport.authenticate('google',{scope:['profile'] }))      //here in 'authenticate' the 'google' is 'google strategy' which was created in 'passport.js'



//@Description - Google auth callback
//@route   GET/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),    //if authentication is failed then redirect the route to the 'Home' page 
    (req,res)=>{
        res.redirect('/dashboard')     //if authentication is successful then redirect the route to the 'dashboard'
    }
)


//@Description - Logout user
//@Route - /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout( (err) => {
    if(err){return next(err)}
    res.redirect('/')     //if error occurs , then go to the 'Home Page'.
    } )
    })

module.exports = router