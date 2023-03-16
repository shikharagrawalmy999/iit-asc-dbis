const express = require('express');
var cors = require('cors');
const sessions = require('express-session');
var app = express();
app.use(express.static('public'));
const {createRestApi} = require('./api.js');

var port = 5001

const cookieParser = require("cookie-parser");
const oneDay = 1000*60*60*24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(require("body-parser").json())
app.use(function(req, res, next) {
   res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
});
app.use(cookieParser());

createRestApi(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
