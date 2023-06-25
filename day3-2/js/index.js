import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

import {getMessagesByUser, sendMessage, editMessage, deleteMessage, getChannelByUser} from './message.js';
import {getNotifByUser, viewAllNotif} from './notification.js'

const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const button = document.getElementById('send');
const msg = document.getElementById('msg');
const loggedBlock = document.getElementById('logged');
const logoutBlock = document.getElementById('logout');
const disconnectButton = document.getElementById('disconnect')
const userInfo = document.getElementById('userInfo');
const msgList = document.getElementById('msg-list');
const createMessage = document.getElementById('createMessage');
const sendMessageButton = document.getElementById('sendMessage');
const editBlock = document.getElementById('edit');
const editButton = document.getElementById('editButton');
const cancelButton = document.getElementById('cancelButton');
const showNotif = document.getElementById('show-notif');
const notifListBlock = document.getElementById('notif-list');
const notifListUl = document.querySelector('#notif-list ul');
const notifNumber = document.getElementById('number-notif')
const channelList = document.getElementById('channelList');
const socket = io("http://localhost:19000", { transports : ['websocket'] });




let editing = false;
let selectedMessage = null;
let userGlobal = {
    isLogged: false,
    infos: null
}
let selectedChannelIndex = null;
let channelsGlobal = []
let notificationsGlobal = []

socket.on("newMessage", (data)=>{
    console.log(data)
    if(data.receiverUserId === userGlobal.infos._id) {
        const token = window.localStorage.getItem('token-auth')
        console.log("c'est moi");
        getChannelByUser(userGlobal.infos, token)
                .then((response)=>{
                    console.log(response)
                    //createMsgList(response.channel.messages)
                });

        getNotifByUser(userGlobal.infos, token)
            .then((response)=>{
                console.log(response.notifications)
                createNotifList(response.notifications)
                notificationsGlobal = response.notifications
            })

    }
})

socket.on("updateDeleteMessage", (data)=>{
    console.log(data)
    if(data.receiverUserId === userGlobal.infos._id || data.senderUserId === userGlobal.infos._id) {
        const token = window.localStorage.getItem('token-auth')
        console.log("c'est moi");
        getMessagesByUser(userGlobal.infos, token)
                .then((response)=>{
                    console.log(response)
                    //createMsgList(response.messages)
                });
    }
})


cancelButton.addEventListener('click', (e)=>{
    e.preventDefault();
    cancelEdit();
})

function cancelEdit(){
    editing = false;
    selectedMessage = null;
    editBlock.style.display = "none";
    sendMessageButton.style.display = "block";
    createMessage.value = "";
}

editButton.addEventListener('click', onClickEditMessage)

button.addEventListener('click', onClickLogin);
disconnectButton.addEventListener('click',disconnect)
sendMessageButton.addEventListener('click', onClickSendMessage)
checkToken()

showNotif.addEventListener('click', (e)=>{
    const token = window.localStorage.getItem('token-auth')
    notifListBlock.classList.toggle('hidden');
    notifNumber.classList.add('hidden');
    const notViewNotif = notificationsGlobal.filter(notif => notif.view === false)

    if(!notifListBlock.classList.contains('hidden') && notViewNotif.length > 0) {
        viewAllNotif(token)
            .then((response)=>{
                console.log(response)
            })
    }


})

function onClickLogin(e){
    e.preventDefault();

    console.log({
        email: loginInput.value, 
        password: passwordInput.value
    })

    fetch('http://localhost:19000/user/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: loginInput.value, 
            password: passwordInput.value
        })
    })
    .then((response)=>{
        return response.json();      
    })
    .then((res)=>{
        console.log("res",res)
        if(res.err) {
            msg.textContent = res.err
        } else {
            window.localStorage.setItem('token-auth', res.token);
            checkToken();
        }
    })
    .catch(err=> console.log(err));
} 

function checkToken(){
    const token = window.localStorage.getItem('token-auth');
    if(!token) {
        gotToLoggout();
        return;
    }

    fetch('http://localhost:19000/checkToken', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        }
    })
    .then((response)=>{
        return response.json();      
    })
    .then((res)=>{
        console.log(res)
        if(res.msg === "token ok") {
            goToLogged(res.user);
            getChannelByUser(res.user, token)
                .then((response)=>{
                    console.log(response)


                    createChannelList(response.channels);
                    channelsGlobal = response.channels

                    if(selectedChannelIndex !== null) {
                        createMsgList(response.channels[selectedChannelIndex].messages)
                    }
                    
                });

                getNotifByUser(res.user, token)
                .then((response)=>{
                    console.log(response.notifications)
                    createNotifList(response.notifications)
                    notificationsGlobal = response.notifications
                })

        } else {
            gotToLoggout();
        }
    })
    .catch((err)=>{
        gotToLoggout();
    })
}

function goToLogged(user){
    userGlobal = {
        isLogged: true,
        infos: user
    };
    loggedBlock.style.display = "block";
    logoutBlock.style.display = "none";
    const p1 = document.createElement('p');
    p1.textContent = user.firstName+" "+user.lastName;
    const p2 = document.createElement('p');
    p2.textContent = user.email;
    userInfo.appendChild(p1);
    userInfo.appendChild(p2);
}

function gotToLoggout(){
    userGlobal = {
        isLogged: false,
        infos: null
    }
    
    loggedBlock.style.display = "none";
    logoutBlock.style.display = "block"
}

function disconnect(e){
    e.preventDefault()
    window.localStorage.removeItem('token-auth');
    checkToken()
}

function createChannelList(channels){
    const ul = document.createElement('ul');
    for(const [index, channel] of channels.entries()) {
        const li = document.createElement('li');
        li.textContent = channel._id;
        li.addEventListener('click', ()=>{
            selectedChannelIndex = index;
            createMsgList(channelsGlobal[index].messages)
        })
        ul.appendChild(li);
    }
    channelList.appendChild(ul)
}


function createMsgList(messages){

    const ul = document.createElement('ul');
    for(const msg of messages) {
        const li = document.createElement('li');
        const span1 = document.createElement('span');
        span1.innerHTML = msg.body;
        const span2 = document.createElement('span');
        span2.textContent = "🗑️";
        span2.addEventListener('click', (e)=>{
            onClickDelete(msg._id)

        })
        li.appendChild(span1);
        li.appendChild(span2);
        if(msg.senderUserId === userGlobal.infos._id) {
            li.classList.add("me");
            span1.addEventListener('click', (e)=>{
                onClickEdit(msg)
            })
        }
        ul.appendChild(li);
    }
    
    msgList.innerHTML = "";
    msgList.appendChild(ul);

}

function createNotifList(notifications) {
    console.log(notifications)
    const notViewNotifs = notifications.filter(notif => notif.view === false)

    if(notViewNotifs.length === 0) {
        notifNumber.classList.add('hidden')
    } else {
        notifNumber.classList.remove('hidden');
        notifNumber.textContent = notViewNotifs.length;
    }

    notifListUl.innerHTML = ""
    for(const notif of notifications) {
        const li = document.createElement("li");
        if(notif.view === false) {
            li.textContent = '- '+notif.message+' ❗'; 
            li.style.backgroundColor = "#a7ecf9"
        } else {
            li.textContent = '- '+notif.message
        }    
        notifListUl.appendChild(li)
    }

}

function onClickEdit(msg){
    editing = true;
    selectedMessage = msg;
    createMessage.value = msg.body;
    editBlock.style.display = "block";
    sendMessageButton.style.display = "none";
}


function onClickSendMessage(e){
    e.preventDefault();
    const token = window.localStorage.getItem('token-auth')
    console.log("userGlobal",userGlobal)
    if(token) {
        let id = null
        if(selectedChannelIndex !== null) {
            id = channelsGlobal[selectedChannelIndex]._id
        }

        sendMessage(userGlobal.infos, createMessage.value, id, token)
        .then((res)=>{
            console.log(res)
            getChannelByUser(userGlobal.infos, token)
                .then((response)=>{
                    console.log(response);
                    createChannelList(response.channels);
                    if(selectedChannelIndex === null) {
                        selectedChannelIndex = response.channels.length - 1;
                    }
                    createMsgList(response.channels[selectedChannelIndex].messages);
                    createMessage.value = ""
                });
        })

    }
}

function onClickEditMessage(e){
    e.preventDefault();
    const token = window.localStorage.getItem('token-auth')
    console.log("userGlobal",userGlobal)
    if(token) {

        editMessage(selectedMessage._id, createMessage.value, token)
        .then((res)=>{
            console.log(res)
            getChannelByUser(userGlobal.infos, token)
                .then((response)=>{
                    console.log(response);
                    channelsGlobal = response.channels;
                    console.log("selectedChannelIndex",selectedChannelIndex)
                    createMsgList(response.channels[selectedChannelIndex].messages);
                    createMessage.value = "";
                    cancelEdit()
                });
        })

    }
}
function onClickDelete(id){
  
    const token = window.localStorage.getItem('token-auth')
    console.log("userGlobal",userGlobal)
    if(token) {

        deleteMessage(id, token)
        .then((res)=>{
            console.log(res)
            getChannelByUser(userGlobal.infos, token)
                .then((response)=>{
                    console.log(response)
                    createMsgList(response.channels[selectedChannelIndex].messages);
                    createMessage.value = "";
                    cancelEdit()
                });
        })

    }
}