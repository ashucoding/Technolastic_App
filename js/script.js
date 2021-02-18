// required elememts//
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeline = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .time_text");
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById("saveScoreBtn");
const high_scores_box = document.querySelector(".high_scores_box");
const high_scores_list = document.getElementById("high_scores_list");
const top_players_box = document.querySelector(".top_players_box");
const top_players_list = document.getElementById("top_players_list");
const top_players_button = document.getElementById("top_players");
const restartButton = document.getElementById("restart");
const topExitButton = document.getElementById("top_exit");
const scoresAdapter = new ScoresAdapter();
const playersAdapter = new PlayersAdapter();

//start quiz button//
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

restartButton.onclick = () => {
    info_box.classList.add("activeInfo");
    top_players_box.style.display = 'none';
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    start_btn.style.display = 'block';
}

topExitButton.onclick = () => {
    info_box.classList.remove("activeInfo");
    top_players_box.style.display = 'none';
    start_btn.style.display = 'block';
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(60);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1; 
let counter;
let counterLine;
let timevalue = 60;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart")
const quit_quiz = result_box.querySelector(".buttons .quit");
const high_scores_box_restart = high_scores_box.querySelector(".buttons .restart");
const high_scores_box_quit = high_scores_box.querySelector(".buttons .quit");
const top_players_box_restart = top_players_box.querySelector(".buttons .restart");
const top_players_box_quit = top_players_box.querySelector(".buttons .quit");
const top_players_box_show = top_players_box.querySelector(".buttons .players");


function restartQuiz(activeBox, activeClass) {
    quiz_box.classList.add("activeQuiz");
    activeBox.classList.remove(activeClass);
    que_count = 0;
    que_numb = 1; 
    timevalue = 60;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timevalue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeoff.textContent = "Time Left";
}
restart_quiz.onclick = () => restartQuiz(result_box, "activeResult");
high_scores_box_restart.onclick = () => restartQuiz(high_scores_box, "activeHighScores");

function quitQuiz() {
    window.location.reload();
}

quit_quiz.onclick = quitQuiz;
high_scores_box_quit.onclick = quitQuiz;

next_btn.onclick = ()=>{
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timevalue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
};


function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb +". "+ questions[index].question +'</span>';
    let option_tag = '<div class="option"> '+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option"> '+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option"> '+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option"> '+ questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
        
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent.trim();
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    console.log(userScore);
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        console.log("right answer");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("wrong answer");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        } 
        
    }

    for(let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disable");
}
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 8){
        let scoreTag = '<span>and Congrats! You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore > 5){
        let scoreTag = '<span>and nice, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else {
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
};

function saveHighScore(e){
    console.log("clicked the save button");
    e.preventDefault();
    scoresAdapter.createScore(username.value, userScore)
    .then(resJSON => {
        console.log(resJSON);
        showHighScoresBox();
    });
};

function showHighScoresBox() {
    high_scores_list.innerHTML = ""; // clear list before showing high
    high_scores_box.classList.add("activeHighScores");
    result_box.classList.remove("activeResult");
    scoresAdapter.getScores()
    .then(respJSON => {
            respJSON.map(score => {
                
                var scoreText = `${score.user.username} - ${score.body}`;
                let li = document.createElement("li");
                li.innerText = scoreText
                high_scores_list.appendChild(li);
            });  
    })
}

function showTopPlayersBox() {
    console.log('ggg==>>', top_players_list);
    top_players_list.innerHTML = ""; // clear list before showing top
    top_players_box.classList.add("activeTopPlayers");
    result_box.classList.remove("activeResult");
    high_scores_box.classList.remove("activeHighScores");
    playersAdapter.getPlayers()
    .then(respJSON => {
            respJSON.slice(-5).map(user => {
                let li = document.createElement("li");
                li.innerText = user.username
                top_players_list.appendChild(li);
                top_players_box.style.display = 'block';
                start_btn.style.display = 'none';
            });  
    })
}

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeoff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            
            for(let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disable");
        }
            next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 109);
    function timer(){
        time += 1;
       timeline.style.width = time + "px";
       if(time > 549){
           clearInterval(counterLine);
       }
     }
}

function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
};


function fetchandLoadScores() {
    this.adapter = new ScoresAdapter;
    this.adapter.getScores.then(scores =>{
        console.log(scores)
    })
};

function fetchandLoadPlayers() {
//    this.adapter = new PlayersAdapter;
    console.log('its working')
    playersAdapter.getPlayers.then(username =>{
        console.log(username)
    });
};

top_players_button.addEventListener('click', showTopPlayersBox);