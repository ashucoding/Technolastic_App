class Score {
    constructor (username, score){
        this.username = username;
        this.score = score;
    };

    render(){
        var scoreText = `${this.username} - ${this.score}`;
        let li = document.createElement("li");
        li.innerText = scoreText;
        high_scores_list.appendChild(li);
        // return `${username} has a score of ${score}`;
    };
};

    

      
   