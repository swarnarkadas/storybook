module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {   //once after login,we don't want see the landing page again
      if (!req.isAuthenticated()) {
        return next();  
      } else {
        res.redirect('/dashboard');               //if authentication is succesful then go to the 'dashboard' 
      }
    },
  }