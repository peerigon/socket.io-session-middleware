## socket.io-session-middleware

Share connect/express sessions with socket.io 1.x

## Setup

[![npm status](https://nodei.co/npm/socket.io-session-middleware.png?downloads=true&stars=true)](https://npmjs.org/package/socket.io-session-middleware)

[![Dependency Status](https://david-dm.org/peerigon/socket.io-session-middleware.svg)](https://david-dm.org/peerigon/socket.io-session-middleware)


## Example

__Server__

```javascript
var socketSession = require("socket.io-session-middleware");
    
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
    
    socket.on("setName", function(data) {
        
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

A full featured example can be found in the _example_ folder. 


## Notes 

Make sure to fire a http request to initialize the session/cookie before accessing the session with socket.io. 
If you are serving the socket.io client with your node.js server this won't be a problem for you.