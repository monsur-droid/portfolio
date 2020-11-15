const io = require('socket.io')(8080);

// Users array
const users = {}

// When user connected to the server
io.on('connection', socket => {
    // If user joins freshly
    socket.on('new-user', name => {
        // Create new user info
        users[socket.id] = name;

        // Emit and broadcast users info to export-user emmiter
        socket.broadcast.emit('export-users', [users, Object.keys(users).length]);
        socket.emit('export-users', [users, Object.keys(users).length]);

        // Announce new user to the group except the new user
        socket.broadcast.emit('user-connected', name)
    })

    // Create server event for accepting message from the client
    socket.on('send-chat-message', messageBody => {
        // Broadcast the message to all the connected  clients except sender
        socket.broadcast.emit('chat-message', messageBody);
    });

    // If user disconneceted
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]

        // Emit and broadcast users info to export-user emmiter
        socket.broadcast.emit('export-users', [users, Object.keys(users).length]);
    })

})

