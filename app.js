const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);

// Routes of users
const userRoutes = require('./routes/user.routes');

const app = express();

// Connect DB To Session
const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/grace',
    collection: 'sessions'
})

// Configure Session
app.use(session({
    secret: 'This is my secret ..... do it',
    saveUninitialized: false,
    store: STORE,
}));

// Detrmine Static Folder
app.use(express.static(path.join(__dirname, 'assets')));

// Determine view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) =>{ 
    res.render('users/index', {
        isUser: req.session.userID,
    })
})

// Use Routes
app.use(userRoutes);


// Listen to server
app.listen(3000, () => {
    console.log('server listen to port 3000')
})