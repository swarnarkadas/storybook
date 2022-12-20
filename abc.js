//npm init' in terminal

//**Dependencies to install */

//npm i express & npm i mongoose
//npm i connect-mongo@3 (this will allow us to store sessions in database, so if we reset the server then we won't logged-out)
//npm i express-session (for sessions & Cookies)
//npm i express-handlebars (for hbs' template engine)
//npm i dotenv 
//npm i method-override (it is allowing us for PUT & DELETE request in template as by default we only can do POST & GET request)
//npm i moment (which is used to formet dates)
//npm i morgan (for log-in)
//npm i passport (for Authentication)
//npm i passport-google-oauth20 (as we use google OAuth for authentication)

//**DevDependencies to install */

//npm i -D nodemon cross-env (as we use in the script' of the 'package.json' file) [now within 'package.json',in 'Script',we remove the 'test' and modify as -
// "start":"cross-env NODE_ENV=production node app",(as we will create 'app.js' file)
// "dev":"cross-env NODE_ENV=development nodemon app"]


//now create 'app.js' file
//create a folder - 'config' & file inside it - 'config.env'


// *Connect Database

// within 'config' folder , create a file named - 'db.js'


//*Template Engine & Layouts 

//create a folder -'views' and within that create another folder -'layouts' and within that create another file -'main.hbs'


//*Index Routes & Views

//create a folder - 'routes' & within that create a file - index.js'

//now also within 'views' folder create two file - 'dashboard.hbs' & 'login.hbs'



//*Materialize & Font Awesome

// for using 'Materialize CSS framework go to official documentation of 'Materialize' & from there copy-paste 2 links in 'main.hbs' file

//for using 'Font Awesome', goto- cdn.js/font-awesome' and from there copy a link tag & paste it in 'main.hbs'



//*Set Static Folder

//create a folder -'public' & within that create another folder-'css' & inside that create a file -'style.css'



//*Start Google Login

// in browser,write -'google cloud console' and go the first link and then create a new project named -'dev1'
//the goto "API and Services", enable API, then find the 'GOOGLE+ API' and enable it, then goto credentials and create credentials:-
// in 'Authorized redirect URIs' , type - "http://localhost:3000/auth/google/callback"
//then copy the 'client ID' & paste it in 'config.env' file as 'GOOGLE_CLIENT_ID'
// & Copy the 'Client Secret' & paste it in 'config.env' file as 'GOOGLE_CLIENT_SECRET'



//*Passport Intro

//'passport' is authentication middleware for Node.js



//*Passport Config & Sessions

// Within 'config' folder create a new file named - 'passport.js'



//** User Model  */

//Create a folder named - 'models' & within that create a file named -'User.js'


// A session will contain some unique data about that client to allow the server to keep track of the user's state. 
//Sessions are server-side files that contain user data



//*Passport Google Strategy

// The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. 
//Passport strategy for authenticating with Google using the OAuth 2.0 API. This module lets you authenticate using Google in your Node.js applications



//*Auth Routes

// Create a file named - 'auth.js' under the folder - 'routes'



//**Navigation */

//Within the 'views' folder,create another folder named - 'partials' & within that create a file - '_header.hbs'



//**Auth Middleware */

// Create a folder - 'middleware' & within that create a file -'auth.js'



//**Story Model */

//Within 'models' folder , create a file named - 'Story.js'



//**Dashboard Stories */

//To handel the errors Within 'views' folder,create another folder named -'error', & within that create 2 files -'500.hbs' & '404.hbs'

//Within the 'partials'folder,create a new file named - '_add_btn.hbs'  (which is for create 'add story' button to add the stories)



//**Add Story */

//Within 'Views' folder create a folder - 'stories' & within that folder create a file named - 'add.hbs'

//Within 'routes' folder,create a file named -'stories.js'



//**Format Date Handlebar Helper */

// Create a folder named - 'helpers' and within that create a file named - 'hbs.js'



//**Public Stories */

// we try to demonstrate all the public stories from all the users,(when you click on 'public storis' in Dashboard's Navbar)

// Within 'stories' folder, create a new file named -'index.hbs'


//**Edit Story */

//Within 'stories' folder,create a new file named - 'edit.hbs'


//**Single Story Page */

//Within 'stories' folder,create a new file named - 'show.hbs'