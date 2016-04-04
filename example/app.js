"use strict";

var connect = require("connect"),
    http = require("http"),
    socketSession = require("../index.js");

var app = connect(),
    server = http.createServer(app),
    io;

var session = {
    store: new connect.session.MemoryStore(),
    secret: "secret",
    key: "mykey.sid",
    cookieParser: connect.cookieParser("secret")
};

io = require("socket.io")(server);

//configure connect session
app.use(session.cookieParser);
app.use(connect.session(session));

//configure socket session
io.use(socketSession(session));

//static server to serve the client
app.use(connect.static(__dirname));

io.on("connection", function(socket){

    socket.on("whoAreYou", function(callback){
        //read from session
        callback(socket.session.name);
    });

    socket.on("setName", function(data) {

        //write to session
        socket.session.name = data.name;
    })
});

server.listen(3000);