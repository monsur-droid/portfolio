const monthNames = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: "Nov",
    11: "Dec",
}


function appendMessage(message, user, userClassAttr, bodyClassAttr, dateClassAttr, fullDate, fontColor) {
    const msgBody = document.createElement('div')
    msgBody.setAttribute('class', bodyClassAttr);

    const userBody = document.createElement('div')
    userBody.setAttribute('class', userClassAttr);
    userBody.innerText = user;

    const mainMessage = document.createElement('span')
    mainMessage.innerText = message;

    const msgDate = document.createElement('span');
    msgDate.setAttribute('style', fontColor);
    msgDate.setAttribute('class', dateClassAttr);
    msgDate.innerText = fullDate;

    const msgArea = document.createElement('div')
    msgArea.appendChild(mainMessage);
    msgArea.appendChild(msgDate)

    msgBody.appendChild(userBody);
    msgBody.appendChild(msgArea)

    chatContainer.appendChild(msgBody)
}

function showDate() {
    const d = new Date();
    return `${d.getDate()} ${monthNames[d.getMonth()].toUpperCase()} @${d.getHours()}:${d.getMinutes()}`
}

let showLog = false
let clickable = false

function scrollTop() {
    window.setInterval(() => {
        if (!showLog) {
            let chat = document.querySelector('.message-container');
            chat.scrollTop = chat.scrollHeight;
        }
    }, 4);
}

function scrollUp() {
    alert(showLog)
    showLog = true
}

document.getElementById('btn-up')
    .addEventListener('click', scrollUp)


function showOnlineUsers() {
    let online = document.querySelector('#online');
    let onlineUsers = document.querySelector('.online-users')
    let clickable = false
    let showUsers = document.querySelector('.show-users')
    onlineUsers.onclick = () => {
        if (online.innerHTML !== '0') {
            showUsers.style.display = 'block';
            setTimeout(() => {
                clickable = true
            }, 500);
        }
    }

    document.querySelector('.message-container').onclick = () => {
        if (clickable) showUsers.style.display = 'none'
        clickable = false
    }
}