## socket.io-session-middleware
------------------------------------------------------------------------

Share connect/express sessions with socket.io 1+


## Usage
------------------------------------------------------------------------

__Server__

```javascript

var socketSession = require("socket.io-session-middleware"),
    io = require("socket.io")(server);
    
var session = {
    store: new connect.session.MemoryStore(),
    secret: "secret",
    key: "mykey.sid",
    cookieParser: connect.cookieParser("secret")
};

io.use(socketSession(session));

io.on("connection", function(socket){

    socket.on("whoAreYou", function(callback){
        
        //read from session
        callback(socket.session.name);
    });
    
    socket.on("Iam", function(data) {
        
        //write to session
        socket.session.name = data.name;
    })
});

```

__Client__

```javascript

socket.emit("setName", { name: "hans" });

socket.emit("whoAreYou", function(name) { 
    console.log("I am " + name); 
});


//=> I am hans 
```

## Full featured Example
------------------------------------------------------------------------

```javascript
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
``` 

## Setup
------------------------------------------------------------------------

[![npm status](https://nodei.co/npm/socket.io-session-middleware.png?downloads=true&stars=true)](https://npmjs.org/package/socket.io-session-middleware)

[![Dependency Status](https://david-dm.org/peerigon/socket.io-session-middleware.svg)](https://david-dm.org/peerigon/socket.io-session-middleware)

