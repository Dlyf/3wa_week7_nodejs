export function getNotifByUser(user, token) {
    return fetch('http://localhost:19000/notificationByUser/'+user._id, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        },
    })
    .then((response)=>{
        return response.json();      
    })
    .catch((err)=>{
        console.log(err)
    })
}

export function viewAllNotif(token) {
    return fetch('http://localhost:19000/notification/view', {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        },
    })
    .then((response)=>{
        return response.json();      
    })
    .catch((err)=>{
        console.log(err)
    })
}