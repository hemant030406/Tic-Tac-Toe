import React from 'react'

const Fetch = async (url, body, method) => {
    const data = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body,
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {return data})
    return data
}

export default Fetch
