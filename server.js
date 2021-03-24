/* eslint no-undef: 0 */
var express = require('express')
var path = require('path')
// eslint-disable-next-line no-unused-vars
var serveStatic = require('serve-static')


app = express()
app.use('/', express.static(path.join(__dirname, 'dist')))
app.use(function(req, res, next) {
  if (
    req.secure ||
    req.headers["x-forwarded-proto"] === "https"
  ) {
    return next();
  } else {
    return res.redirect("https://" + req.headers.host + req.url);
  }
}); //https redirect if someone finds it via insecure http

var port = process.env.PORT || 8080 // PORT is defined by heroku, leave it alone. else 8080 for local-prod
app.listen(port)
console.log('server started ' + port)
