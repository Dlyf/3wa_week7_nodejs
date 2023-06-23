console.log('front')

    fetch('http://localhost:5002/user/all', {
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((response)=> response.json())
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

    fetch('http://localhost:5002/restaurant/2', {
        headers: {
            'Access-Control-Allow-Origin':'*'
        }
    })
    .then((response)=> response.json())
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })