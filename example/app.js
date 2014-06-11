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

app.use(connect.json());
app.use(session.cookieParser);
app.use(connect.session(session));
app.use(connect.static(__dirname));

io = require("socket.io")(server);

io.use(socketSession(session));

io.on("connection", function(socket){

    socket.on("msg", function(msg, callback){
        socket.session.msg = msg;

        console.log("msg received and saved", socket.session);
        callback(socket.session);
    });
});

server.listen(3000);