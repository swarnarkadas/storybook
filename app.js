const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')         //so whenever we send any request as -'localhost:3000/' then will also print the result with status code in Consoles
const exphbs = require('express-handlebars')   // for 'hbs template engine'
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')   //import 'db.js'



const app = express()

//Load config
dotenv.config({ path: './config/config.env' })


//Passport config
require('./config/passport')(passport)

connectDB();  //call the connectDB' function


// Body Parser Middleware
app.use(express.urlencoded({ extended: false }))   //To read the data from req.body,we need this middleware
app.use(express.json())


//Method Override NPM
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))


//Logging
if (process.env.NODE_ENV == 'development') {   //only run if it is in 'development' mode
  app.use(morgan('dev'))
}


// Format Date Handlebar Helper
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')


//Handlebars template engine
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');


//Sessions Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,           //means we don't want to save the 'session' if nothing is modified
  saveUninitialized: false,     //means don't create a session untill something is store
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// Set Global Variable
app.use(function (req,res,next){
  res.locals.user = req.user  || null
  next()
})

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))     //index.js
app.use('/auth', require('./routes/auth'))   //auth.js
app.use('/stories', require('./routes/stories.js'))   //stories.js


const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)  //So in terminal,if we type-'npm run dev' then it shows that -'server in running in "development" mode & 
  //if we write -'npm start' then it shows that -'server in running in "production" mode & 
)