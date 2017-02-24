var express = require('express');
var app = express();
var fs = require('fs');

var request = require('request');
var urlutils = require('url');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// parses json, x-www-form-urlencoded, and multipart/form-data
var bodyParser = require('body-parser');
app.use(bodyParser());

// use req.session as data store
var session = require('cookie-session');
app.use(session({keys: ['secret']}));

// authentication middleware
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;

var templates = require('consolidate');
app.engine('hbs', templates.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/jq-course.local/templates');

var auth = passport.authenticate(
	'local', {
		successRedirect: '/', 
		failureRedirect: '/'
	}
);



app.use(express.static(__dirname + '/jq-course.local'));

// app.get('/', auth);

app.post("/", auth)


var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
  usernameField: 'flogin',
  passwordField: 'fpass'
},
	function(username, password, done) {
		if (username != 'admin')
			return done(null, false, {message: 'Неверный логин'});

		if (password != 'admin')
			return done(null, false, {message: 'Неверный пароль'});

		return done(null, {username: 'admin'});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(id, done) {
	done(null, {username: id});
});






app.listen(8081);
console.log('Express server listening on port 8081');