const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

//@Description - login/landing page 
//@route   GET/
router.get('/', ensureGuest, (req, res) => {       //For using 'morgan' npm, when we write -'localhost:3000' then in console it also print -'GET / 200 3.443 ms - 5'
    res.render('login', {           //it will render the 'login.hbs' file inside 'views' folder
        layout: 'login',          //it will render the 'login.hbs' file inside 'layout' folder
    })
})


//@Description - Dashboard
//@route   GET/dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {       // For using 'morgan' npm, when we write -'localhost:3000/dashboard' then in console it also print -'GET /dashboard 200 9.459 ms - 9'
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {      //it will render the 'dashboard.hbs' file inside 'views' folder
            name: req.user.firstName,
            stories,
        })

    } catch (err) {
        console.log(err)
        res.render('error/500')
    }

})
module.exports = router