require('dotenv').config();
const path = require('path');
const express = require('express');
const httplib = require('http');
const socketio = require('socket.io');
const io_client = require('socket.io-client');

const app = express();
const http = httplib.createServer(app);
const io = exports.io = socketio(http, {
    cookie: false
});

function startServer() {
    // Specify app version
    app.locals.version = require('./package.json').version;

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function(req, res){                    
        res.redirect('/triangles')
    });

    app.get('/triangles', function(req, res){                    
        res.send();
    }); 

    io.on('connection', function(socket) {
        console.log('New connection: ', socket.id);
    });

    http.listen(3001);
    console.log('Server Live');
}

startServer();
