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

function scrollTop() {
    window.setInterval(() => {
        let chat = document.querySelector('.message-container');
        chat.scrollTop = chat.scrollHeight;
    }, 4);
}

