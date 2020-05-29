var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))

const port = process.env.PORT || 8080
app.listen(port)
console.log('server started ' + port)