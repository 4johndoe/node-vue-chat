let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    let user = Date.now();

    socket.on('message.sent', function(message) {
        io.emit('message', user + ": " + message);
    });

    io.emit('message', 'User ' + user + ' connected');
});

http.listen(3000, () => {
    console.log('Started server');
});

