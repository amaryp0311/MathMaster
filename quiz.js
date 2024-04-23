let r = document.getElementById("result") ?? 0;
let q = document.getElementById("question") ?? "";
let sc = document.getElementById("score") ?? {
    innerHTML: 0
};
let t = document.getElementById("time") ?? 0;
let cuz = "";
let numQuestions = 0;
var number = 3;
let timerInterval;

// Function to generate a new question
function genQ() {
    let timeLeft = 5;
    let correctAnswer = true;
    while (correctAnswer) {
        let a = Math.floor(Math.random() * 99) + 1;
        let b = Math.floor(Math.random() * 99) + 1;
        let ans = 0;
        let ope = "";
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                ope = "+";
                ans = a + b;
                break;
            case 1:
                ope = "-";
                if (a < b) {
                    b = Math.floor(Math.random() * a) + 1;
                }
                ans = a - b;
                break;
            case 2:
                ope = "×";
                a = Math.floor(Math.random() * 12) + 1;
                b = Math.floor(Math.random() * 12) + 1;
                ans = a * b;
                break;
            case 3:
                ope = "÷";
                if (a % b != 0) {
                    continue;
                }
                ans = a / b;
                break;
        }
        localStorage.setItem("score", numQuestions);
        sc.innerHTML = localStorage.getItem("score");
        q.innerHTML = numQuestions + 1;
        r.innerHTML = a + " " + ope + " " + b;

        timeLeft = 5;
        updateTimer(timeLeft);
        timerInterval = setInterval(function () {
            timeLeft--;
            updateTimer(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                t.innerHTML = "Time's up!";
                cuz = "Time's up!";
                localStorage.setItem("text", cuz);
                window.location.href = 'gameOver.html';
            }
        }, 1000);
        let arr = genAns(ans);
        //console.log(arr);
        correctAnswer = false;
        createButtons(arr, ans);
        numQuestions++;
        // localStorage.setItem("score", numQuestions);
    }
}

// Function to update the timer display
function updateTimer(timeLeft) {
    t.innerHTML = timeLeft;
}

// Function to generate answer choices
function genAns(ans) {
    let a1 = 0, a2 = 0, a3 = 0;
    let array = [ans, a1, a2, a3];
    let i = 1;
    while (i < array.length) {
        if (genOpe() == "+") {
            let n = ans + Math.floor(Math.random() * 10) + 1;
            if (!array.includes(n)) {
                array[i] = n;
                i++;
            }
        } else {
            let n = ans - Math.floor(Math.random() * 10) + 1;
            if (!array.includes(n)) {
                array[i] = n;
                i++;
            }
        }

    }
    randomlySwap(array);
    return array
}

// Function to randomly select an operation
function genOpe() {
    let ope1 = "";
    switch (Math.floor(Math.random() * 2)) {
        case 0:
            ope1 = "+";
        case 1:
            ope1 = "-";
    }
    return ope1;
}

// Function to randomly swap elements in an array
function randomlySwap(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to create buttons
function createButtons(array, ans) {
    var container = document.getElementById('buttonsContainer');
    if (container?.innerHTML) container.innerHTML = '';

    array.forEach(function (item) {
        var button = document.createElement('button');
        button.textContent = item;
        button.classList.add('button');
        button.addEventListener('click', function () {
            if (item != ans) {
                cuz = "Wrong answer";
                window.location.href = 'gameOver.html';
            } else {
                clearInterval(timerInterval);
                genQ();
            }
        });
        container?.appendChild(button);
    });
}

// function skipQuestion() {
//     if (number > 0) {
//         clearInterval(timerInterval);
//         genQ();
//         number--;
//         document.getElementById('skipButton').textContent = number;
//     }
// }

function skipQuestion() {
    if (number > 0) {
        clearInterval(timerInterval);
        genQ();
        number--;
        document.querySelector('#skipButton .number').textContent = number;
    }
}

// Event listener to start the game when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    genQ();
});