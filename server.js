/* eslint no-undef: 0 */
var express = require('express')
var path = require('path')
// eslint-disable-next-line no-unused-vars
var serveStatic = require('serve-static')


app = express()
app.use('/', express.static(path.join(__dirname, 'dist')))

var port = process.env.VUE_APP_PORT || 80
app.listen(port)
console.log('server started ' + port)
