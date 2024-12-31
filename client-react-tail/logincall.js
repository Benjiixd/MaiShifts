async function loginCall(username, password) {
    const response = await fetch('http://104.248.200.63:3020/database/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    return data;
 
}
module.exports = loginCall;