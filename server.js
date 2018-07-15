var express = require('express');
var app = express();
var path = require("path");

app.use(express.static(__dirname + '/dist/APP-CHAT'));

// app.listen(process.env.PORT || 8080);

// app.use(express.static("./public"));  // đứng từ client
// app.set("view engine", "ejs");
// app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 8080);
// app.listen(process.env.PORT || 8080);


var arrUsers = [];


io.on("connection", listenClient);

function listenClient(socket) {
    console.log('connect - ' + socket.id);
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
        console.log('Logout' + socket.username);
        var index = arrUsers.indexOf(socket.username);
        arrUsers.splice(index, 1);
        socket.broadcast.emit("server-send-users", arrUsers);
    });

    socket.on("client-send-message", function (data) {
        io.sockets.emit("server-send-message",
            {
                username: socket.username,
                message: data
            });
    });

    // socket.on("send-message", function (data) {
    //     io.sockets.emit("message", 
    //     { 
    //         message: data
    //     });
    // });

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
        console.log('DISCONNECT : ' + socket.id);
    });

}

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/APP-CHAT/index.html'));
});
