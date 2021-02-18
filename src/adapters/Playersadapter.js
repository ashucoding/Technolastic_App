class PlayersAdapter {
    constructor(){
        this.baseUrl = 'http://localhost:3000/api/v1/users'
    }

    getPlayers(){
        return fetch(this.baseUrl).then(res =>res.json())
    }

    createUser(username) {
        return fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username})
        })
        .then(res => res.json())
    }
}