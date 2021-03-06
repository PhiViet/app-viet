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


var listUsers = [];


io.on("connection", listenClient);

function listenClient(socket) {
    socket.on('register-a-user', function (data) {
        if (listUsers.findIndex(e => e.username === data) == -1) {
            socket.username = data;
            socket.emit('register-success', data);
        }
        else {
            socket.emit('register-fail', data);
        }
    });

    socket.on('re-register-a-user', function (data) {
        if (listUsers.findIndex(e => e.username === data) == -1) {
            socket.username = data;
            let user = {
                socketid: socket.id,
                username: data
            }
            listUsers.push(user);
            socket.emit('re-register-success');
            io.emit('list-online', listUsers);
        }
        else {
            socket.emit('re-register-fail', data);
        }
    });

    socket.on('send-private-message', function (data) {
        socketid = data.socketid;
        data.username = socket.username;
        data.socketid = socket.id;
        socket.to(socketid).emit('get-private-message',data);
    });

    socket.on('logout', deleteAUser);

    socket.on('disconnect', deleteAUser);

    function deleteAUser() {
        var index = listUsers.findIndex(e => e.username === socket.username)
        if (index > -1) {
            listUsers.splice(index, 1);
            socket.broadcast.emit("list-online", listUsers);
        }
    }

    socket.on("client-send-message", function (data) {
        io.emit("server-send-message",
            {
                username: socket.username,
                message: data
            });
    });

    socket.on("client-typing", function () {
        var s = socket.username;
        socket.broadcast.emit("status-typing", s);
    });

    socket.on("client-untyping", function () {
        socket.broadcast.emit("status-untyping");
    });

}

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/APP-CHAT/index.html'));
});

// schema
var onlineSchema = mongoose.Schema({
    name: String,
    time: Date
})

var Online = mongoose.model('Online', onlineSchema);

function deleteUserFromListOnline(username) {
    Online.findOneAndDelete({ name: username })
        .then();
}
// router
const router = require('express').Router();
router.post('/addUserToListOnline', addUserToListOnline);
router.delete('/deleteUserOnline/:id', deleteUserOnline);

function deleteUserOnline(req, res, next) {
    name = req.query.name;

    Online.findOneAndDelete({ name: name })
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
