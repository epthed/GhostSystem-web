/* eslint no-undef: 0 */
var express = require('express')
var path = require('path')
// eslint-disable-next-line no-unused-vars
var serveStatic = require('serve-static')


app = express()
app.use('/', express.static(path.join(__dirname, 'dist')))

var port = process.env.PORT || 8080 // PORT is defined by heroku, leave it alone. else 8080
app.listen(port)
console.log('server started ' + port)
