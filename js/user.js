
class User {
    constructor (username, scores){
        this.username = username;
        this.scores = scores;
    };

    render(){
        let num_scores = this.scores.length;
        let li = document.createElement("li");
        let text = `${this.username}: ${num_scores} plays`
        li.innerText = text;
        
        return li;
        // return `${username} has a score of ${score}`;
    };
};

                
            