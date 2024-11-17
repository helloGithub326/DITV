var elvation = document.getElementById("elvation");
var speed_elem = document.getElementById("speed");
var lowestElevationHeader = document.getElementById("lowest-elevation");
var character = document.getElementById("character");
var game = document.getElementById("game");
var questionHeader = document.getElementById("question");
var coinsHeader = document.getElementById("coins");
var fallHeader = document.getElementById("fall");
var instructHeader = document.getElementById("instruct");
var questionLevelHeader = document.getElementById("question-level");
var lowestElevationEverHeader = document.getElementById("lowest-elevation-ever");
var interval;
var both = 0;
var counter = 0;
var speed = 0.2;
var increase = 0.000004;
var move = 2;
var paused = false;
var speed1 = speed;
var increase1 = increase;
var cur_elevation = 296;
var currentBlocks = [];
var question = undefined;
var answer = undefined;
var operatorChance = undefined;
var operator = undefined;
var firstNumber = undefined;
var secondNumber = undefined;
var correctAnswers = 0;
var currentMaxNum = 10;
var space = 600;
var spaceIncrease = 0.005;
var fall = false;
var end = false;
var lowestElevationEver = "-1048m by sillllllly gooosy"
var lowestElevation = localStorage.getItem("lowest-elevation");
var coinsAmount = localStorage.getItem("coins");
var selected = localStorage.getItem("selected");
var hasGreen = localStorage.getItem("has-green");
var hasBlue = localStorage.getItem("has-blue");
var hasAbility = localStorage.getItem("has-ability");
var hasAbility1 = localStorage.getItem("has-ability1");
var hasAbility2 = localStorage.getItem("has-ability2");
var achieve100 = document.getElementById("achieve-100");
var achieveNegative = document.getElementById("achieve-negative");
var achieveNegative100 = document.getElementById("achieve-negative-100");
var achieveNegative250 = document.getElementById("achieve-negative-250");
var achieveNegative500 = document.getElementById("achieve-negative-500");
var achieveNegative1000 = document.getElementById("achieve-negative-1000");
var achieveNegative2500 = document.getElementById("achieve-negative-2500");
var achieveNegative5000 = document.getElementById("achieve-negative-5000");
var achieveNegative7798 = document.getElementById("achieve-negative-7798");
var abilityOn = 0;

if (selected == null) {
    selected = "red";
    localStorage.setItem("selected", selected)
    selected = localStorage.getItem("selected");
}

if (selected == "red") {
    changeRed(character);
}
if (selected == "green") {
    changeGreen(character);
}
if (selected == "blue") {
    changeBlue(character);
}

pauseGame();
askQuestion();
 
window.addEventListener('keydown', function () { if (event.keyCode == 32) { document.body.style.overflow = "hidden"; } });
window.addEventListener('keyup', function () { if (event.keyCode == 32) { document.body.style.overflow = "auto"; } });

window.addEventListener('keydown', function () { if (event.keyCode == 38) { document.body.style.overflow = "hidden"; } });
window.addEventListener('keyup', function () { if (event.keyCode == 38) { document.body.style.overflow = "auto"; } });

window.addEventListener('keydown', function () { if (event.keyCode == 40) { document.body.style.overflow = "hidden"; } });
window.addEventListener('keyup', function () { if (event.keyCode == 40) { document.body.style.overflow = "auto"; } });

if (hasGreen == null) {
    hasGreen = false;
    localStorage.setItem("has-green", hasGreen);
    hasGreen = localStorage.getItem("has-green");
}

if (hasBlue == null) {
    hasBlue = false;
    localStorage.setItem("has-blue", hasBlue);
    hasBlue = localStorage.getItem("has-blue");
}

if (hasAbility == null) {
    hasAbility = false;
    localStorage.setItem("has-ability", hasAbility);
    hasAbility = localStorage.getItem("has-ability");
}

if (hasAbility1 == null) {
    hasAbility1 = false;
    localStorage.setItem("has-ability1", hasAbility1);
    hasAbility1 = localStorage.getItem("has-ability1");
}

if (hasAbility2 == null) {
    hasAbility2 = false;
    localStorage.setItem("has-ability2", hasAbility2);
    hasAbility2 = localStorage.getItem("has-ability2");
}

lowestElevationEverHeader.innerText = `Lowest Elevation Ever: ${lowestElevationEver}`;

function endGame() {
    alert("Game over. Elevation: " + (cur_elevation) + "m. The answer was " + (answer));
    clearInterval(blocks);
    location.reload();
}

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function changeRed(character) {
    character.style.backgroundColor = "red";
    move = 1.5;
    character.style.width = "20px";
    character.style.height = "20px";
    character.style.borderRadius = "50%"
}

function changeGreen(character){
    character.style.backgroundColor = "green";
    move = 1.5;
    character.style.width = "10px";
    character.style.height = "10px";
    character.style.borderRadius = "50%"
}

function changeBlue(character){
    character.style.backgroundColor = "blue";
    move = 2;
    character.style.width = "10px";
    character.style.height = "10px";
    character.style.borderRadius = "0%"
}

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - move + "px";
    }
}
function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 480) {
        character.style.left = left + move + "px";
    }
}
function pauseGame() {
    if (paused) {
        speed = speed1;
        increase = increase1;
        paused = false;
        instructHeader.innerText = "";
    } else {
        speed1 = speed;
        increase1 = increase;
        increase = 0;
        speed = 0;
        paused = true;
        instructHeader.innerText = "Press space to start/resume";
    }
}
function getRandomInt(min, max) {
    var num = Math.floor(Math.random() * max);
    while (num < min) {
        num = Math.floor(Math.random() * max);
    }
    return num;
}
function getRandomFloat(max) {
    int = (Math.random() * (0.0 - max) + max).toFixed(1);
    while (true) {
        if (int == 0) {
            int = (Math.random() * (0.0 - max) + max).toFixed(1);
        } else {
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
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
function askQuestion() {
    if (correctAnswers <= 20) {
        askBasic1Question();
        questionLevelHeader.innerText = `Question Level: 1 - ${20 - correctAnswers} questions left before next level`;
    } else if ((correctAnswers <= 40) && (correctAnswers > 20)) {
        askBasic2Question();
        questionLevelHeader.innerText = `Question Level: 2 - ${40 - correctAnswers} questions left before next level`;
    } else if ((correctAnswers <= 60) && (correctAnswers > 40)) {
        askBasic3Question();
        questionLevelHeader.innerText = `Question Level: 3 - ${60 - correctAnswers} questions left before next level`;
    } else if ((correctAnswers <= 80) && (correctAnswers > 60)) {
        askBasic4Question();
        questionLevelHeader.innerText = `Question Level: 4 - ${80 - correctAnswers} questions left before next level`;
    } else if ((correctAnswers <= 100) && (correctAnswers > 80)) {
        askBasic5Question();
        questionLevelHeader.innerText = `Question Level: 5 - ${100 - correctAnswers} questions left before next level`;
    } else if ((correctAnswers <= 120) && (correctAnswers > 100)) {
        askBasic6Question();
        questionLevelHeader.innerText = `Question Level: 6 - ${120 - correctAnswers} questions left before next level`;
    } else {
        askBasic6Question();
        questionLevelHeader.innerText = "Question Level: 6";
    }
}
function askBasic1Question() {
    currentMaxNum = 10;
    operatorChance = getRandomInt(0, 4);
    firstNumber = getRandomInt(0, 10);
    secondNumber = getRandomInt(0, 10);
    if (operatorChance == 0) {
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    } else if (operatorChance == 1) {
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    } else if (operatorChance == 2) {
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    } else if (operatorChance == 3) {
        firstNumber = getRandomInt(1, 10);
        secondNumber = getRandomInt(1, 10);
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while (true) {
            if (isFloat(answer)) {
                firstNumber = getRandomInt(1, 10);
                secondNumber = getRandomInt(1, 10);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            } else {
                break;
            }
        }
    }
    questionHeader.innerText = question;
}
function askBasic2Question() {
    currentMaxNum = 100;
    operatorChance = getRandomInt(0, 4);
    firstNumber = getRandomInt(0, 100);
    secondNumber = getRandomInt(0, 100);
    if (operatorChance == 0) {
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    } else if (operatorChance == 1) {
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    } else if (operatorChance == 2) {
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    } else if (operatorChance == 3) {
        firstNumber = getRandomInt(1, 100);
        secondNumber = getRandomInt(1, 100);
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while (true) {
            if (isFloat(answer)) {
                firstNumber = getRandomInt(1, 100);
                secondNumber = getRandomInt(1, 100);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            } else {
                break;
            }
        }
    }
    questionHeader.innerText = question;
}
function askBasic3Question() {
    currentMaxNum = 1000;
    operatorChance = getRandomInt(0, 4);
    firstNumber = getRandomInt(0, 1000);
    secondNumber = getRandomInt(0, 1000);
    if (operatorChance == 0) {
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    } else if (operatorChance == 1) {
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    } else if (operatorChance == 2) {
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    } else if (operatorChance == 3) {
        firstNumber = getRandomInt(1, 1000);
        secondNumber = getRandomInt(1, 1000);
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while (true) {
            if (isFloat(answer)) {
                firstNumber = getRandomInt(1, 1000);
                secondNumber = getRandomInt(1, 1000);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            } else {
                break;
            }
        }
    }
    questionHeader.innerText = question;
}
function askBasic4Question() {
    currentMaxNum = 10000;
    operatorChance = getRandomInt(0, 4);
    firstNumber = getRandomInt(0, 10000);
    secondNumber = getRandomInt(0, 10000);
    if (operatorChance == 0) {
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    } else if (operatorChance == 1) {
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    } else if (operatorChance == 2) {
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    } else if (operatorChance == 3) {
        firstNumber = getRandomInt(1, 10000);
        secondNumber = getRandomInt(1, 10000);
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while (true) {
            if (isFloat(answer)) {
                firstNumber = getRandomInt(1, 10000);
                secondNumber = getRandomInt(1, 10000);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            } else {
                break;
            }
        }
    }
    questionHeader.innerText = question;
}
function askBasic5Question() {
    currentMaxNum = 10;
    operatorChance = getRandomInt(0, 4);
    firstNumber = getRandomFloat(10.0);
    secondNumber = getRandomFloat(10.0);
    if (operatorChance == 0) {
        question = `${firstNumber} + ${secondNumber}`;
        answer = firstNumber + secondNumber;
    } else if (operatorChance == 1) {
        question = `${firstNumber} - ${secondNumber}`;
        answer = firstNumber - secondNumber;
    } else if (operatorChance == 2) {
        question = `${firstNumber} * ${secondNumber}`;
        answer = firstNumber * secondNumber;
    } else if (operatorChance == 3) {
        firstNumber = getRandomFloat(1, 10.0);
        secondNumber = getRandomFloat(1, 10.0);
        question = `${firstNumber} / ${secondNumber}`;
        answer = firstNumber / secondNumber;
        while (true) {
            if (isFloat(answer)) {
                firstNumber = getRandomFloat(10.0);
                secondNumber = getRandomFloat(10.0);
                question = `${firstNumber} / ${secondNumber}`;
                answer = firstNumber / secondNumber;
            } else {
                break;
            }
        }
    }
    questionHeader.innerText = question;
}
function askBasic6Question() {
    while (true) {
        currentMaxNum = 100;
        operatorChance = getRandomInt(0, 4);
        firstNumber = getRandomFloat(10.0);
        secondNumber = getRandomFloat(10.0);
        if (operatorChance == 0) {
            question = `${firstNumber} + ${secondNumber}`;
            answer = firstNumber + secondNumber;
        } else if (operatorChance == 1) {
            question = `${firstNumber} - ${secondNumber}`;
            answer = firstNumber - secondNumber;
        } else if (operatorChance == 2) {
            question = `${firstNumber} * ${secondNumber}`;
            answer = firstNumber * secondNumber;
        } else if (operatorChance == 3) {
            question = `${firstNumber} / ${secondNumber}`;
            answer = firstNumber / secondNumber;
            while (true) {
                if (isFloat(answer)) {
                    firstNumber = getRandomFloat(100.0);
                    secondNumber = getRandomFloat(100.0);
                    question = `${firstNumber} / ${secondNumber}`;
                    answer = firstNumber / secondNumber;
                } else {
                    break;
                }
            }
        }
        if (answer.countDecimals() <= 2) {
            break;
        }
    }
    questionHeader.innerText = question;
}
function checkAnswer(check) {
    if (check) {
        correctAnswers += 1;
        askQuestion();
    } else {
        end = true;
    }
}
function ability() {
    var speed1 = speed;
    if (!paused && (cur_elevation > 50)) {
        speed = 0;
        setTimeout(() => { speed = speed1; }, 500);
    }
}
document.addEventListener("keydown", event => {
    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            if (!paused) {
                interval = setInterval(moveLeft, 1);
            }
        }
        if (event.key === "ArrowRight") {
            if (!paused) {
                interval = setInterval(moveRight, 1);
            }
        }
    }
});
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
        pauseGame();
    }
    if (e.keyCode == 38) {
        if(hasAbility == "true") {
            if (abilityOn == 0){
                ability();
                abilityOn = 60000;
            }else{
                alert("You have to wait until you can use the ability")
            }
        }
    }
    if (e.keyCode == 40) {
        if (fall) {
            fall = false;
        } else {
            fall = true;
        }
    }
    if (e.keyCode == 49) {
        changeRed(character);
        selected = "red";
        localStorage.setItem("selected", selected);
    }
    if (e.keyCode == 50) {
        if (hasGreen == "true") {
            changeGreen(character);
            selected = "green";
            localStorage.setItem("selected", selected);
        }
    }
    if (e.keyCode == 51) {
        if (hasBlue == "true") {
            changeBlue(character);
            selected = "blue";
            localStorage.setItem("selected", selected);
        }
    }
    if (e.keyCode == 191) {
        let option = prompt("Settings Panel - Option? (Reset=Reset all data)").toLowerCase();
        if (option == "admin.c") {
            let amountOfCoins = prompt("How many coins?")
            let password = prompt("Password:");
            if (password == "ditv.admin@pranay") {
                coinsAmount = parseInt(coinsAmount) + parseInt(amountOfCoins);
                localStorage.setItem("coins", coinsAmount);
            }else{
                alert("Password is incorrect");
            }
        }else if (option == "admin.e"){
            let amount = prompt("Elevation:");
            let password = prompt("Password:");
            if (password == "ditv.admin@pranay") {
                cur_elevation = amount;
                elevation.innerText = `Elevation ${cur_elevation}`;
            }else{
                alert("Password is incorrect");
            }
        }else if (option == "reset"){
            let choice = confirm("Are you sure you want to reset all your data?");
            if (choice){
                localStorage.clear();
                alert("Reset successful");
                lowestElevation = 296;
                localStorage.setItem("lowest-elevation", lowestElevation);
                clearInterval(blocks);
                location.reload();
            }
        }else{
            alert("Incorrect option");
        }
    }
}
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

var blocks = setInterval(function () {
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if (blockLastTop < 300 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        var hole1 = document.createElement("div");
        var holec = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        hole1.setAttribute("class", "hole1");
        holec.setAttribute("class", "holec");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        hole1.setAttribute("id", "hole1" + counter);
        holec.setAttribute("id", "holec" + counter);
        block.style.top = blockLastTop + space + "px";
        hole.style.top = holeLastTop + space + "px";
        hole1.style.top = holeLastTop + space + "px";
        holec.style.top = holeLastTop + space + "px";
        if (((counter % 2) == 0)) {
            while (true) {
                if (operatorChance == 2) {
                    hole.innerText = getRandomInt(0, currentMaxNum * 10);
                    hole1.innerText = getRandomInt(0, currentMaxNum * 10);
                    holec.innerText = answer;
                    if (hole.innerText == answer) {
                        hole.innerText = getRandomInt(0, currentMaxNum * 10);
                    } else if (hole1.innerText == answer) {
                        hole1.innerText = getRandomInt(0, currentMaxNum * 10);
                    } else {
                        break;
                    }
                } else {
                    hole.innerText = getRandomInt(0, currentMaxNum);
                    hole1.innerText = getRandomInt(0, currentMaxNum);
                    holec.innerText = answer;
                    if (hole.innerText == answer) {
                        hole.innerText = getRandomInt(0, currentMaxNum);
                    } else if (hole1.innerText == answer) {
                        hole1.innerText = getRandomInt(0, currentMaxNum);
                    } else {
                        break;
                    }
                }
            }
        }
        var random = getRandomInt(0, 120);
        var random1 = getRandomInt(160, 280);
        var random2 = getRandomInt(320, 450);
        var chance = getRandomInt(0, 3)
        if (chance === 0) {
            hole.style.left = random + "px";
            hole1.style.left = random1 + "px";
            holec.style.left = random2 + "px";
        } else if (chance === 1) {
            hole.style.left = random1 + "px";
            hole1.style.left = random2 + "px";
            holec.style.left = random + "px";
        } else if (chance === 2) {
            hole.style.left = random2 + "px";
            hole1.style.left = random + "px";
            holec.style.left = random1 + "px";
        }
        game.appendChild(block);
        game.appendChild(hole);
        game.appendChild(hole1);
        game.appendChild(holec);
        currentBlocks.push(counter);
        counter++;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if (characterTop <= 0) {
        end = true;
    }
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let ihole1 = document.getElementById("hole1" + current);
        let iholec = document.getElementById("holec" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        let ihole1Left = parseFloat(window.getComputedStyle(ihole1).getPropertyValue("left"));
        let iholecLeft = parseFloat(window.getComputedStyle(iholec).getPropertyValue("left"));
        iblock.style.top = iblockTop - speed + "px";
        ihole.style.top = iblockTop - speed + "px";
        ihole1.style.top = iblockTop - speed + "px";
        iholec.style.top = iblockTop - speed + "px";
        if(hasAbility2 == "true"){
            speed = speed + (increase/2);
        }else{
            speed = speed + increase;
        }
        space = space + spaceIncrease;
        elevation.innerText = `Elevation: ${cur_elevation}m`;
        speed_elem.innerText = `Speed: ${round((speed * 10), 2)}mph`;
        lowestElevation = localStorage.getItem("lowest-elevation");
        if (cur_elevation < lowestElevation) {
            localStorage.setItem("lowest-elevation", cur_elevation);
        } else if (lowestElevation == null) {
            localStorage.setItem("lowest-elevation", cur_elevation);
        }
        if (coinsAmount == null || coinsAmount == "NaN") {
            coinsAmount = 0;
            localStorage.setItem("coins", coinsAmount);
        }
        if (fall == true) {
            fallHeader.innerText = "Fall: On";
            if(!ihole.innerText == ""){
                ihole.style.setProperty("--bg-color", "white");
            }
            if(!ihole1.innerText == ""){
                ihole1.style.setProperty("--bg-color", "white");
            }
            if(!iholec.innerText == ""){
                iholec.style.setProperty("--bg-color", "white");
            }
        } else {
            fallHeader.innerText = "Fall: Off";
            if(!ihole.innerText == ""){
                ihole.style.setProperty("--bg-color", "gray");
            }
            if(!ihole1.innerText == ""){
                ihole1.style.setProperty("--bg-color", "gray");
            }
            if(!iholec.innerText == ""){
                iholec.style.setProperty("--bg-color", "gray");
            }
        }
        coinsAmount = localStorage.getItem("coins");
        lowestElevationHeader.innerText = `Your Lowest Elevation: ${lowestElevation}m`
        coinsHeader.innerText = `Coins: ${coinsAmount}`
        if (speed < 0.2 && !paused) {
            speed = 0.2;
        }
        if (speed >= 1) {
            speed = 1;
            increase1 = increase;
            increase = 0;
        }
        if (abilityOn > 0){
            abilityOn--;
        }
        if (cur_elevation == -7798){
            pauseGame();
            alert("You have reached the bottom, you can continue longer to get a lower elevation");
            coinsAmount = parseInt(coinsAmount) + 2500;
            localStorage.setItem("coins", coinsAmount);
        }
        if (lowestElevation < 100){
            achieve100.innerText = "Under 100 Meters: Yes"
        }else{
            achieve100.innerText = "Under 100 Meters: No"
        }
        if (lowestElevation < 0){
            achieveNegative.innerText = "Negative Meters: Yes"
        }else{
            achieveNegative.innerText = "Negative Meters: No"
        }
        if (lowestElevation < -100){
            achieveNegative100.innerText = "Under Negative 100 Meters: Yes"
        }else{
            achieveNegative100.innerText = "Under Negative 100 Meters: No"
        }
        if (lowestElevation < -250){
            achieveNegative250.innerText = "Under Negative 250 Meters: Yes"
        }else{
            achieveNegative250.innerText = "Under Negative 250 Meters: No"
        }
        if (lowestElevation < -500){
            achieveNegative500.innerText = "Under Negative 500 Meters: Yes"
        }else{
            achieveNegative500.innerText = "Under Negative 500 Meters: No"
        }
        if (lowestElevation < -1000){
            achieveNegative1000.innerText = "Under Negative 1000 Meters: Yes"
        }else{
            achieveNegative1000.innerText = "Under Negative 1000 Meters: No"
        }
        if (lowestElevation < -2500){
            achieveNegative2500.innerText = "Under Negative 2500 Meters: Yes"
        }else{
            achieveNegative2500.innerText = "Under Negative 2500 Meters: No"
        }
        if (lowestElevation < -5000){
            achieveNegative5000.innerText = "Under Negative 5000 Meters: Yes"
        }else{
            achieveNegative5000.innerText = "Under Negative 5000 Meters: No"
        }
        if (lowestElevation < -7798){
            achieveNegative7798.innerText = "Beat Game/Under Negative 7798 Meters: Yes"
        }else{
            achieveNegative7798.innerText = "Beat Game/Under Negative 7798 Meters: No"
        }
        if (iblockTop < -20) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
            ihole1.remove();
            iholec.remove();
        }
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholecLeft <= characterLeft && iholecLeft + 30 >= characterLeft) {
                if (iholec.innerText == answer) {
                    if (fall) {
                        checkAnswer(true);
                        if(hasAbility1 == "true"){
                            coinsAmount = parseInt(coinsAmount) + parseInt(round((speed * 10), 0) * 2);
                        }else{
                            coinsAmount = parseInt(coinsAmount) + parseInt(round((speed * 10), 0));
                        }
                        localStorage.setItem("coins", coinsAmount);
                    }
                } else {
                    drop = 0;
                }
            }
            if (iholeLeft <= characterLeft && iholeLeft + 30 >= characterLeft) {
                if (ihole.innerText == "") {
                    end = false;
                    drop = 0;
                    fall = false;
                } else if (fall) {
                    end = true;
                    drop = 0;
                }
            }
            if (ihole1Left <= characterLeft && ihole1Left + 30 >= characterLeft) {
                if (ihole1.innerText == "") {
                    end = false;
                    drop = 0;
                    fall = false;
                } else if (fall) {
                    end = true;
                    drop = 0;
                }
            }
        }
    }
    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = characterTop + 1 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
}, 1);

var blocks = setInterval(function () {
    if (!paused) {
        cur_elevation--;
    }
}, 500);

var blocks = setInterval(function () {
    if (end) {
        endGame();
        end = true;
    }
}, 500);