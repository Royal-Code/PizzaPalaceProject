const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        console.log(`${username} : ${password}`);
      if (username == "admin") {
            if (password == "password") {
                
                console.log("BOOP");
                return done(null, {username: "admin"});

            }
      }

      return done("Login Incorrect");
    }
  ));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});