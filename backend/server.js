const express = require("express");
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');


const app = express();
const domain = process.env.DOMAIN
const port = process.env.PORT

app.use(cookieParser());

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    keys: ['some random key'],
    resave: false,
    saveUninitialized: false,
    name: 'sessid',
    cookie: {
        maxAge: parseInt(process.env.COOKIE_EXPIRESIN), // Used for expiration time.
        sameSite: 'strict', // Cookies will only be sent in a first-party context. 'lax' is default value for third-parties.
        httpOnly: true, //Ensures the cookie is sent only over HTTP(S)
        domain: domain, //Used to compare against the domain of the server in which the URL is being requested.
        secure: false // Ensures the browser only sends the cookie over HTTPS. false for localhost.
    }
});
app.use(sessionConfig);

// ** Routes requirements
const testRoutes = require("./routes/test");

// ** Routes usage
app.use('/test', testRoutes);

app.listen(port, ()=> {
    console.log(`Listening at http://${domain}:${port}`)
});
