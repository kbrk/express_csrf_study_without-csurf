const { randomBytes } = require('crypto');

/**
 * @desc Generates a token and assigns it as a request parameter which can be used in response. 
 * If the request is setCSRFTokenSTP, assign the data to the session. 
 */
const generateCSRFToken = (req, res, next) => {
    try {
        const path = req.route.path;
        const data = randomBytes(36).toString('base64'); //Generates pseudorandom data. The size argument is a number indicating the number of bytes to generate.
        req.csrf_token = data; // Used as a response and cookie parameter in router. 
        if (path == "/setCSRFTokenSTP") {
            req.session.csrfToken = data; // Assigns a token parameter to the session.
        }
        next();
    } catch (e) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}

/**
 * @desc Checks and compares the tokens from the request header and session.
 * STP: Synchronizer Token Pattern
 */
const checkCSRFTokenSTP = (req, res, next) => {
    try {
        const sessionUserAuth = req.session.userAuthentication;
        const sessionCsrfToken = req.session.csrfToken;
        const requestCsrfToken = req.get('CSRF-Token'); //The token sent within the request header.
        if (!sessionUserAuth || !requestCsrfToken || !sessionCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Token has not been provided.'
                });
        }
        if (requestCsrfToken !== sessionCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Invalid token.'
                });
        }
        next();
    } catch (e) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}

/**
 * @desc Checks and compares the tokens from the request header and cookie.
 * DSC: Double Submit Cookie
 */
const checkCSRFTokenDSC = (req, res, next) => {
    try {
        const sessionUserAuth = req.session.userAuthentication;
        const cookieCsrfToken = req.cookies.CSRF_TOKEN;
        const requestCsrfToken = req.get('CSRF-Token'); //The token sent within the request header.

        if (!sessionUserAuth || !requestCsrfToken || !cookieCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Token has not been provided.'
                });
            return;
        }
        if (requestCsrfToken !== cookieCsrfToken) {
            res.status(401)
                .json({
                    result: false, message: 'Invalid token.'
                });
            return;
        }
        next();
    } catch (e) {
        res.status(500).json({ result: false, message: e.message });
        return;
    }
}

/**
 * @desc set and check csrf token.
 * */
module.exports = {
    generateCSRFToken, checkCSRFTokenSTP, checkCSRFTokenDSC
};