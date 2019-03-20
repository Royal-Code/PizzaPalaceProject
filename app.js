const express = require('express');
const exphbs  = require('express-handlebars');

const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const cookieSession = require('cookie-session');

const path = require('path');

const passport      = require('passport');

const app = express();
const port = 8080;


app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.resolve('./views/layouts/'),
    partialsDir: path.resolve('./views/partials/')
}));
app.set('view engine', 'handlebars');

app.use(express.static('public/'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["SexBread"],   
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passport');

app.use((req, res, next) => {
    app.locals = {
        user: req.user
    };
    //console.log(req.user);
    next();
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/',passport.authenticate('local') ,(req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    //console.log("Server Started on Port: " + port);
    app.emit('listened', null);
});


module.exports = app;
