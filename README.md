# express_csrf_study_(without csurf) - A study about mitigating CSRF manually on Node.js Express 


<p>After express csurf middleware has been deprecated with no plan to fix the security vulnerabilities, in this study, CSRF prevention is tried to implement manually with two simple examples by using Synchronizer Token Pattern and Double Submit Cookie techniques.</p>

# Dev Dependencies:
<p><b>nodemon:</b> A tool that helps develop node.js based applications by restarting automatically the application when file changes are detected in the directory.</p>

# Dependencies:
<p><b>dotenv:</b> A module for environmental configuration variables.</p>
<p><b>express:</b> A backend web application framework for Node.js.</p>
<p><b>express-session:</b> A session middleware for Express.</p>

# .env variables

There should be a .env file in ./backend and its variables are;

```dotenv
DOMAIN
PORT
SESSION_SECRET
# cookie expires in milliseconds
COOKIE_EXPIRESIN
```

# Package Installation
```
cd backend
npm install
```
# Usage
```
npm run start:dev
```
