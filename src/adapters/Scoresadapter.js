class ScoresAdapter {
    constructor(){
        this.baseUrl = 'http://localhost:3000/api/v1/scores'
    }

    getScores(){
        return fetch(this.baseUrl).then (res =>res.json())
    }

    createScore(username, score) {
        return fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, score: score})
        })
        .then(res => res.json())
    }
}