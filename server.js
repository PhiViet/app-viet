var express = require('express');
var app = express();
var path = require('path');

var routerUsers = require('./router');
// connect mongodb
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var server = require('http').Server(app);
var io = require('socket.io')(server);
// mongodb://<dbuser>:<dbpassword>@ds139951.mlab.com:39951/dbchat
mongoose.connect('mongodb://phiviet:viethoa00@ds139951.mlab.com:39951/dbchat', { useNewUrlParser: true });
    // mongoose.connect('mongodb://localhost:27017/chatDB', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('connected mongo in port 27017');
}); 

// path to dist
app.use(express.static(__dirname + '/dist/APP-CHAT'));

server.listen(process.env.PORT || 8080);
// app.listen(process.env.PORT || 8080);


var arrUsers = [];


io.on("connection", listenClient);

function listenClient(socket) {
    
    // client send username
    socket.on("client-send-username", function (data) {
        if (arrUsers.indexOf(data) > -1) {
            socket.emit("server-send-register-fail");
        }
        else {

            arrUsers.push(data);
            socket.username = data;
            socket.emit("server-send-register-success", data);
            io.sockets.emit("server-send-users", arrUsers);
        }
    })

    socket.on("logout", function () {
        var index = arrUsers.indexOf(socket.username);
        arrUsers.splice(index, 1);
        // deleteUserFromListOnline(socket.username);
        socket.broadcast.emit("server-send-users", arrUsers);
    });

    socket.on("client-send-message", function (data) {
        io.sockets.emit("server-send-message",
            {
                username: socket.username,
                message: data
            });
    });

    socket.on("client-typing", function () {
        var s = socket.username + " in typing";
        socket.broadcast.emit("status-typing", s);
    });

    socket.on("client-untyping", function () {
        // var s = socket.username;
        socket.broadcast.emit("status-untyping");
    });

    socket.on("disconnect", function () {
        var index = arrUsers.indexOf(socket.username);
        arrUsers.splice(index, 1);
        socket.broadcast.emit("server-send-users", arrUsers);

        // deleteUserFromListOnline(socket.username);

        console.log('DISCONNECT : ' + socket.id);
    });

}

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/APP-CHAT/index.html'));
});

// schema
var onlineSchema = mongoose.Schema({
    name: String
})

var Online = mongoose.model('Online', onlineSchema);

function deleteUserFromListOnline(username) {
    Online.findOneAndDelete({ name: username })
        .then();
}
// router
const router = require('express').Router();
router.post('/addUserToListOnline', addUserToListOnline);
router.delete('/deleteUserOnline/:id',deleteUserOnline);

function deleteUserOnline(req, res, next) {
    name = req.query.name;

    Online.findOneAndDelete({name:name})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        next(err);
    })
}

function addUserToListOnline(req, res, next) {
    body = {
        name: req.body.name,
        time: new Date()
    }
    var user = new Online(body);

    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

app.use(bodyParser.json());
app.use('/api/', router);
