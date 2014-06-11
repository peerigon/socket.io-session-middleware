## socket.io-session-middleware

share connect/express sessions with socket.io

### Usage


```javascript
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
```
