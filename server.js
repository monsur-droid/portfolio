const express = require('express');
const chatServer = require('./chat-server');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const path = require('path');
var credentials = require('./lib/credentials.js');

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//import middleware for handling form body
//app.use(bodyParser.json());
app.use(express.json());

// Handlebars middleware
app.engine('.hbs', exphbs({defaulLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//import middleware for handling cookies
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

// Flash message
app.use(function (req, res, next) {
    // If there's a flash message, transfer it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', require('./routes/index'))


/*-----------------Error--------------------------*/
app.use((req, res)=>{
    res.status(404).send('Error 404: Page not found')
})

let PORT = process.env.PORT || 4000
module.exports = PORT;
app.listen(PORT, ()=>{
    console.log(`Server started at:http://localhost:${PORT}. CTRL-C to terminate...`)
})
// Create socket.IO
