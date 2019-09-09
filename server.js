const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const passport = require('passport');

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);


//Use routes  
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server running on ${port}`));