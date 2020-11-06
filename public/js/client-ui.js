const socket = io('http://localhost:3000');

// Query document for DOM elements
const sendBtn = document.querySelector('#send-button');
const msgInput = document.querySelector('#message-input');
const chatContainer = document.querySelector('.message-container');
const name = document.querySelector('#userName').innerHTML;
const onlineUser = document.querySelector('#online');
const allOnline = document.querySelector('#all-online');


// Create an emitter that gets number of user from the server
socket.on('export-users', users => {
    allOnline.innerHTML = ''

    // Unpack users (users is a list)
    let [allUsers, totalOnline] = users
    
    // Get values from all users, filter and map to list items, then
    // add the resulting elements to a container
    Object.values(allUsers)
        .filter(user => user !== name)
        .map(user => `<li>${user}</li>`)
        .every(user => allOnline.innerHTML += user)

    // Display numbers of all onilne users minus the current user
    onlineUser.innerHTML = totalOnline - 1

    // Don't show online users if no user is online
    if ( onlineUser.innerHTML === '0') {
        document.querySelector('.show-users').style.display = 'none';
    }
})

socket.emit('new-user', name)

// Create a client event for accepting a broadcast message from the server
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

    // Don't allow null or empty space in the input
    if (/^\s*$/.test(message)) return

    // Emit the message to the server
    socket.emit('send-chat-message', { name: name, message: message });
    msgInput.value = '';

    appendMessage(message, '', '', 'sender-body', 'date-body', showDate())
})

scrollTop()
showOnlineUsers()
appendMessage('You joined', '', '', 'info-body', 'date-body', showDate(), 'color:#fff')
