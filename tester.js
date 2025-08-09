const currentUser = localStorage.getItem("username");
if (!currentUser) {
  window.location.href = "login.html"; // redirect if not logged in
}

console.log("page loaded successfully")

/* GLOBAL VARIABLES */
let resultMessage = "";
let resultColor = "black";
let moneyChangeMessage = "";
let moneyChangeColor = "black";
let myScore = 0;
let enemyScore = 0;
let ties = 0;
let dollars = 1000;
let winrate = "0%";
let lastEnemyChoice = "";
let myLastChoice ="";
/* GLOBAL VARIABLES */

const saved = localStorage.getItem(`progress_${currentUser}`);
if (saved) {
  const progress = JSON.parse(saved);
  myScore = progress.wins;
  enemyScore = progress.losses;
  ties = progress.ties;
  dollars = progress.dollars;
  winrate = progress.winrate;
}
document.addEventListener("DOMContentLoaded", updateUI);

/* LOADING SCREEN */
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
    }, 1000);
});

/* LOADING SCREEN */
/* MATH */
let a = 3
let b = 5
class Calculate {

    static add(a, b) {
    return a + b;
    }
    static subtract(a, b){
    return a - b;
    }
    static multiply(a, b){
    return a * b;
    }
    static divide(a, b){
        if (b == 0){
            console.log("Cannot divide by 0");
            return;
        }
        return a / b;
    }
}
/*  console.log(Calculate.add(a, b))
    console.log(Calculate.subtract(a, b))
    console.log(Calculate.multiply(a, b))
    console.log(Calculate.divide(a, b))
*/
/* MATH */
function countDown(seconds){//random project
    let timeleft = seconds
    const timer = setInterval(() => {
    if (timeleft > 0) {
        const value = timeleft === 1 ? "second" : "seconds";
        console.log(`Time left: ${timeleft} ${value}`);
        timeleft--;
        } else {
        console.log("Timer finished");
        clearInterval(timer);
    }
}, 1000);
}
//countDown(10)

function date () {//random project
    setInterval(() => {
     let date = new Date();
     console.log("It is currently: " + date)
    },1000);
}
//date();

let options = ["rock", "paper", "scissors"];    
function getEnemyChoices () {
    let randomChoice = Math.floor(Math.random() * options.length)
    return options[randomChoice];
}
/*FUNCTIONALITY*/

function playGame(myChoice, times = 1, betAmount = 0){
    myLastChoice = myChoice.toLowerCase();

    if (!options.includes(myChoice)) {//makes it not case sensitive
    console.log("Not valid");
    return;
    }
    let winnings = 0;
    let win = 0;
    let loss = 0;
    for (let i = 0; i < times; i++) {
        if (dollars < betAmount) {
            console.log("Not enough money to bet!");
            return;
        }
        let enemy = getEnemyChoices();

        console.log("------------------------------------")
        console.log("Enemy chose: " + enemy)
        console.log("You chose: " + myChoice)

        let loseConditions = (myChoice == "paper" && enemy == "scissors") || (myChoice == "rock" && enemy == "paper") || (myChoice == "scissors" && enemy == "rock");
        if (enemy === myChoice) {
            console.log("Tie!")
            resultMessage = "Tie!";
            resultColor = "black";
            moneyChangeMessage = "+$0.00";
            moneyChangeColor = "black";
            ties++;
            console.log("------------------------------------")
        } else if (loseConditions) {
            loss = betAmount * 1;
            resultMessage = "You lose!";
            resultColor = "red";
            console.log("You lose!")
            moneyChangeMessage = `-$${loss.toFixed(2)}`;
            moneyChangeColor = "red";
            enemyScore++
            winnings -= loss;
            console.log(`You lost $${loss.toFixed(2)}`);
            console.log("------------------------------------")
        } else {
            win = betAmount * 1.15;
            console.log("You win!")
            resultMessage = "You win!";
            resultColor = "green";
            moneyChangeMessage = `+$${win.toFixed(2)}`;
            moneyChangeColor = "green";
            myScore++
            winnings += win;
            console.log(`You won $${win.toFixed(2)}`);
            console.log("------------------------------------")
        }
    lastEnemyChoice = enemy;
    let totalRounds = myScore + enemyScore + ties;
    let rate = totalRounds === 0 ? 0 : Calculate.divide(myScore, totalRounds) * 100;
     winrate = rate.toFixed(1) + "%";
    }
    dollars += winnings;

   // let winrate = (Calculate.divide(myScore, (myScore + enemyScore + ties)) * 100 + "%");
    let beatTheAI = false;
    if (parseFloat(winrate) > 50) {
        beatTheAI = true;
    }
    setTimeout(() => {
        console.log("CURRENT SCORE:")
        console.log("WINS: " + myScore)
        console.log("LOSSES: " + enemyScore)
        console.log("TIES: " + ties)
    }, 750);
    setTimeout(() => {
        console.log("WINRATE: " + winrate)
        console.log("MONEY: $" + dollars.toFixed(2))
    }, 750);
    setTimeout(() => {
    if (beatTheAI || dollars > 1000) {
        console.log("------------------------------------")
        console.log("YOU WIN")
        console.log("------------------------------------")
    } else {
        console.log("------------------------------------")
        console.log("YOU LOSE")
        console.log("------------------------------------")
    }
},1000);
const progress = {
  wins: myScore,
  losses: enemyScore,
  ties: ties,
  dollars: dollars,
  winrate: winrate
};

localStorage.setItem(`progress_${currentUser}`, JSON.stringify(progress));


}



document.getElementById("playButton").addEventListener("click", function () {
  const selectedHand = document.getElementById("options").value;
  const betInput = document.getElementById("betAmount").value;
  const betAmount = parseFloat(betInput);

  if (isNaN(betAmount) || betAmount <= 0) {
    alert("INVALID");
    return;
  } else if (betAmount > dollars) {
    alert("Not enough money to bet");
    return;
  }

  playGame(selectedHand, 1, betAmount);
  updateUI();
/*FUNCTIONALITY*/
/* ELEMENTS */


});
function updateUI() {
  document.getElementById("usernameDisplay").textContent = currentUser;
  document.getElementById("wins").textContent = myScore;
  document.getElementById("losses").textContent = enemyScore;
  document.getElementById("ties").textContent = ties;
  document.getElementById("winrate").textContent = winrate;
  document.getElementById("enemy").textContent = lastEnemyChoice;
  document.getElementById("myChoice").textContent = myLastChoice;
  document.getElementById("dollars").textContent = "$" + dollars.toFixed(2);
  document.getElementById("result").textContent = resultMessage;
  document.getElementById("result").style.color = resultColor;
  document.getElementById("moneyChange").textContent = moneyChangeMessage;
  document.getElementById("moneyChange").style.color = moneyChangeColor;
}

/* ELEMENTS */
/* LOGIN SYSTEM */
async function loginUser() {
  const name = document.getElementById("loginName").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!name || !password) {
    document.getElementById("loginMessage").textContent = "Please enter both username and password.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, password })
    });

const data = await response.json();

if (data.message === "Success") {
  localStorage.setItem("username", name);
  window.location.href = "game.html";
} else {
  document.getElementById("loginMessage").textContent = data.message;
}
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("loginMessage").textContent = "Unable to connect to server.";
  }
}

function logout() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
/* LOGIN SYSTEM */




