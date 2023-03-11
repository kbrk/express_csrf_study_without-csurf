const express = require('express');
const router = express.Router();
const csrfPrevention = require('../middleware/csrf-prevention');

const userAuth = (req, res, next) => {
    req.session.userAuthentication = true; //Let's assume there is a successfull authentication process.
    next();
}

//router for Synchronizer Token Pattern
router.post('/setCSRFTokenSTP',
    userAuth,
    csrfPrevention.generateCSRFToken,
    function (req, res) {
        res.send({ result: true, csrf_token: req.csrf_token });
    }
);

router.post('/checkCSRFTokenSTP', csrfPrevention.checkCSRFTokenSTP, function (req, res) {
    res.send({ result: true, message: 'Valid token.' });
});

//request for Double Submit Cookie
router.post('/setCSRFTokenDSC',
    userAuth,
    csrfPrevention.generateCSRFToken,
    function (req, res) {
        res.status(200)
            .cookie('CSRF_TOKEN', req.csrf_token, {
                secure: true,
                httpOnly: true,
                sameSite: true,
                encode: String,
                domain: process.env.DOMAIN,
                //expires: new Date(Date.now() + parseInt(process.env.CSRF_TOKEN_COOKIE_EXPIRESIN))
            })
            .json({ result: true, csrf_token: req.csrf_token });
    }
);

router.post('/checkCSRFTokenDSC', csrfPrevention.checkCSRFTokenDSC, function (req, res) {
    res.send({ result: true, message: 'Valid token.' });
});

module.exports = router;
