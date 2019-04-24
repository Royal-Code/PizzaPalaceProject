const express = require('express');
const exphbs  = require('express-handlebars');

const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const cookieSession = require('cookie-session');

const path = require('path');
const fs = require('fs');

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

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

app.post('/submitorder', (req, res) => {
    
    var order = req.body;
    var PizzaSection = `
        `;

    console.log(order);

    (order.pizza).forEach( pizza => {
        PizzaSection += `${pizza.size} ${pizza.base} ${pizza.type}
        `;
    });

    fs.writeFileSync("./orders/order_"+makeid(6)+".txt", `
        Table: ${order.tableNumber},

        Pizzas: ${PizzaSection}
    `)
    res.send("BOOP");
});

app.listen(port, () => {
    console.log("Server Started on Port: " + port);
    app.emit('listened', null);
});


module.exports = app;
