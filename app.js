const express = require('express');
const exphbs  = require('express-handlebars');

const passport      = require('passport');

const app = express();
const port = 8080;



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public/'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/', (req, res) => {

});

app.listen(port, () => {
    console.log("Server Started on Port: " + port);
    app.emit('listened', null);
});


module.exports = app;
