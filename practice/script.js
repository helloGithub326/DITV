var questionHeader = document.getElementById("question");
var answerInput = document.getElementById("answer");
var checkButton = document.getElementById("check");
var scoreHeader = document.getElementById("score");
var question = undefined;
var answer = undefined;
var correctAnswers = 0;
var operatorChance = undefined;
var operator = undefined;
var firstNumber = undefined;
var secondNumber = undefined;
var int = 0;
var players = "";
var missions = "";

function getRandomInt(max) {
    int = Math.floor(Math.random() * max);
    while(true){
        if(int == 0){
            int = Math.floor(Math.random() * max);
        }else{
            break;
        }
    }
    return int;
}

function getRandomFloat(max){
    int = (Math.random() * (0.0 - max) + max).toFixed(1);
    while(true){
        if(int == 0){
            int = (Math.random() * (0.0 - max) + max).toFixed(1);
        }else{
            break;
        }
    }
    return int;
}

Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function askQuestion(){
    if(correctAnswers <= 10){
        askBasic1Question();
    }else if((correctAnswers <= 20) && (correctAnswers > 10)){
        askBasic2Question();
    }else if((correctAnswers <= 30) && (correctAnswers > 20)){
        askBasic3Question();
    }else if((correctAnswers <= 40) && (correctAnswers > 30)){
        askBasic4Question();
    }else if((correctAnswers <= 50) && (correctAnswers > 40)){
        askBasic5Question();
    }else if((correctAnswers <= 60) && (correctAnswers > 50)){
        askBasic6Question();
    }
}

function askBasic1Question(){
    operatorChance = getRandomInt(4);
    firstNumber = getRandomInt(10);
    secondNumber = getRandomInt(10);
    if(operatorChance == 0){
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    }else if(operatorChance == 1){
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    }else if(operatorChance == 2){
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    }else if(operatorChance == 3){
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while(true){
            if(isFloat(answer)){
                firstNumber = getRandomInt(10);
                secondNumber = getRandomInt(10);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            }else{
                break;
            }
        }
    }
    questionHeader.innerText = question;
}

function askBasic2Question(){
    operatorChance = getRandomInt(4);
    firstNumber = getRandomInt(100);
    secondNumber = getRandomInt(100);
    if(operatorChance == 0){
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    }else if(operatorChance == 1){
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    }else if(operatorChance == 2){
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    }else if(operatorChance == 3){
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while(true){
            if(isFloat(answer)){
                firstNumber = getRandomInt(100);
                secondNumber = getRandomInt(100);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            }else{
                break;
            }
        }
    }
    questionHeader.innerText = question;
}

function askBasic3Question(){
    operatorChance = getRandomInt(4);
    firstNumber = getRandomInt(1000);
    secondNumber = getRandomInt(1000);
    if(operatorChance == 0){
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    }else if(operatorChance == 1){
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    }else if(operatorChance == 2){
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    }else if(operatorChance == 3){
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while(true){
            if(isFloat(answer)){
                firstNumber = getRandomInt(1000);
                secondNumber = getRandomInt(1000);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            }else{
                break;
            }
        }
    }
    questionHeader.innerText = question;
}

function askBasic4Question(){
    operatorChance = getRandomInt(4);
    firstNumber = getRandomInt(10000);
    secondNumber = getRandomInt(10000);
    if(operatorChance == 0){
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    }else if(operatorChance == 1){
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    }else if(operatorChance == 2){
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    }else if(operatorChance == 3){
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while(true){
            if(isFloat(answer)){
                firstNumber = getRandomInt(10000);
                secondNumber = getRandomInt(10000);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            }else{
                break;
            }
        }
    }
    questionHeader.innerText = question;
}

function askBasic5Question(){
    operatorChance = getRandomInt(4);
    firstNumber = getRandomInt(100000);
    secondNumber = getRandomInt(100000);
    if(operatorChance == 0){
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    }else if(operatorChance == 1){
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    }else if(operatorChance == 2){
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    }else if(operatorChance == 3){
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while(true){
            if(isFloat(answer)){
                firstNumber = getRandomInt(100000);
                secondNumber = getRandomInt(100000);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            }else{
                break;
            }
        }
    }
    questionHeader.innerText = question;
}

function askBasic6Question(){
    while(true){
        operatorChance = getRandomInt(4);
        firstNumber = getRandomFloat(10.0);
        secondNumber = getRandomFloat(10.0);
        if(operatorChance == 0){
            question = `${firstNumber} + ${secondNumber}`;
            answer = firstNumber + secondNumber;
        }else if(operatorChance == 1){
            question = `${firstNumber} - ${secondNumber}`;
            answer = firstNumber - secondNumber;
        }else if(operatorChance == 2){
            question = `${firstNumber} * ${secondNumber}`;
            answer = firstNumber * secondNumber;
        }else if(operatorChance == 3){
            question = `${firstNumber} / ${secondNumber}`;
            answer = firstNumber / secondNumber;
            while(true){
                if(isFloat(answer)){
                    firstNumber = getRandomInt(10);
                    secondNumber = getRandomInt(10);
                    question = `${firstNumber} / ${secondNumber}`;
                    answer = firstNumber / secondNumber;
                }else{
                    break;
                }
            }
        }
        if(answer.countDecimals() <= 2){
            break;
        }
    }
    questionHeader.innerText = question;
}

function checkAnswer(){
    if(answerInput.value == answer){
        correctAnswers += 1;
        scoreHeader.innerText = `Correct Answers: ${correctAnswers}`;
        answerInput.value = "";
        askQuestion();
    }else{
        correctAnswers -= 5;
        scoreHeader.innerText = `Correct Answers: ${correctAnswers}`;
        answerInput.value = "";
        askQuestion();
    }
}

askQuestion();