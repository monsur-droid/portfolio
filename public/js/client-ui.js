const socket = io('http://localhost:3000');

// Query document for DOM elements
const sendBtn = document.querySelector('#send-button');
const msgInput = document.querySelector('#message-input');
const chatContainer = document.querySelector('.message-container');
const name = document.querySelector('#userName').innerHTML;
const onlineUser = document.querySelector('#online');

// Create an emitter that gets number of user from the server
socket.on('export-users', users => {
    // If name is not set
    let usersOnline = Object.keys(users).length
    onlineUser.innerHTML = usersOnline
    socket.emit('new-user', name)
})

// Create a client event for accepting message from the server
socket.on('chat-message', data => {
    const sanitizedMessage = data.message.replace(/<([^>]*)>/gi, '')
    appendMessage(data.message, data.name, 'sender-row', 'broadcast-body', 'date-body', showDate())
});

// Create client event when new user connected
socket.on('user-connected', name => {
    const announce = `${name} joined`
    appendMessage(announce, '', '', 'info-body', 'date-body', showDate(), 'color:#fff')
});

// Create client event when ndisconnected
socket.on('user-disconnected', name => {
    const announce = `${name} left`
    appendMessage(announce, '', '', 'info-body', 'date-body', showDate(), 'color:#fff')
});

// Button events when clicked
sendBtn.addEventListener('click', e => {
    e.preventDefault()
    let message = msgInput.value;
    if (/^\s*$/.test(message)) return

    // Emit the message to the server
    socket.emit('send-chat-message', { name: name, message: message });
    msgInput.value = '';

    appendMessage(message, '', '', 'sender-body', 'date-body', showDate())

})


appendMessage('You joined', '', '', 'info-body', 'date-body', showDate(), 'color:#fff')

scrollTop()