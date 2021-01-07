const express = require('express');
const path = require('path');


const app = express();


// Detrmine Static Folder
app.use(express.static(path.join(__dirname, 'assets')));

// Determine view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) =>{ 
    res.render('users/index')
})


// Listen to server
app.listen(3000, () => {
    console.log('server listen to port 3000')
})