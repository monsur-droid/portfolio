const io = require('socket.io')(3000);

// Users array
const users = {}
let numberOfConnection;


// When user connected to the server
io.on('connection', socket => {
    // Export number of users
    
    socket.broadcast.emit('export-users', users);
    socket.emit('export-users', users);

    // If user joins freshly
    socket.on('new-user', name => {
        // Create new user info
        users[socket.id] = name;

        // Broadcast message to the group
        socket.broadcast.emit('user-connected', name)
    })

    // Create server event for accepting message from the client
    socket.on('send-chat-message', messageBody => {

        // Broadcast the message to all the connected  clients except sender
        socket.broadcast.emit('chat-message', messageBody)
    });

    //if user disconneceted
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]
    })
})

