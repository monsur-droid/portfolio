const io = require('socket.io')(3000);

// Users array
const users = {kill: 'oneone'}
let numberOfConnection;

// When user connected to the server
io.on('connection', socket => {
    // Export number of users
    socket.emit('export-users', users)

    // If user joins freshly
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    })


    // Create server event for accepting message from the client
    socket.on('send-chat-message', messageBody => {

        // Broadcast the message to all the connected  clients except sender
        socket.broadcast.emit('chat-message', messageBody)
    });


    //if user disconnecetd
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id]
    })

    
})

