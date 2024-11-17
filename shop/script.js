var coinsHeader = document.getElementById("coins");
var coinsAmount = localStorage.getItem("coins");
var buyGreenButton = document.getElementById("buy-green");
var greenCharacter = document.getElementById("character-green");
var buyBlueButton = document.getElementById("buy-blue");
var blueCharacter = document.getElementById("character-blue");
var buyAbilityButton = document.getElementById("buy-ability");
var buyAbility1Button = document.getElementById("buy-ability1");
var buyAbility2Button = document.getElementById("buy-ability2");
var selected = localStorage.getItem("selected");
var hasGreen = localStorage.getItem("has-green");
var hasBlue = localStorage.getItem("has-blue");
var hasAbility = localStorage.getItem("has-ability");
var hasAbility1 = localStorage.getItem("has-ability1");
var hasAbility2 = localStorage.getItem("has-ability2");

coinsHeader.innerText = `Coins: ${coinsAmount}`;

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

greenCharacter.setAttribute("id", "character");
changeGreen(greenCharacter);
greenCharacter.style.left = "45px";
greenCharacter.style.top = "30px";

blueCharacter.setAttribute("id", "character");
changeBlue(blueCharacter);
blueCharacter.style.left = "45px";
blueCharacter.style.top = "30px";

if(selected == null){
    selected = "red";
    localStorage.setItem("selected", selected);
    selected = localStorage.getItem("selected");
}

if(hasGreen == null){
    hasGreen = false;
    localStorage.setItem("has-green", hasGreen);
    hasGreen = localStorage.getItem("has-green");
}

if(hasBlue == null){
    hasBlue = false;
    localStorage.setItem("has-blue", hasBlue);
    hasBlue = localStorage.getItem("has-blue");
}

if(hasAbility == null){
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

buyGreenButton.addEventListener("click", function(event) {
    if(hasGreen == "true"){
      alert("You already have this");
    }else if(coinsAmount >= 250){
        coinsAmount = coinsAmount - 250;
        localStorage.setItem("coins", coinsAmount);
        hasGreen = true;
        localStorage.setItem("has-green", hasGreen);
        hasGreen = localStorage.getItem("has-green")
        coinsHeader.innerText = `Coins: ${coinsAmount}`;
        selected = "green";
        localStorage.setItem("selected", selected);
        selected = localStorage.getItem("selected");
        alert("Purchase succesfull");
    }else{
        alert(`You don't have enough coins, you need ${250 - coinsAmount} more coins`);
    }
});

buyBlueButton.addEventListener("click", function(event) {
    if(hasBlue == "true"){
      alert("You already have this");
    }else if(coinsAmount >= 500){
        coinsAmount = coinsAmount - 500;
        localStorage.setItem("coins", coinsAmount);
        hasBlue = true;
        localStorage.setItem("has-blue", hasBlue);
        hasBlue = localStorage.getItem("has-blue")
        coinsHeader.innerText = `Coins: ${coinsAmount}`;
        selected = "blue";
        localStorage.setItem("selected", selected);
        selected = localStorage.getItem("selected");
        alert("Purchase succesfull");
    }else{
        alert(`You don't have enough coins, you need ${500 - coinsAmount} more coins`);
    }
});

buyAbilityButton.addEventListener("click", function(event) {
    if(hasAbility == "true"){
      alert("You already have this");
    }else if(coinsAmount >= 1000){
        coinsAmount = coinsAmount - 1000;
        localStorage.setItem("coins", coinsAmount);
        hasAbility = true;
        localStorage.setItem("has-ability", hasAbility);
        hasAbility = localStorage.getItem("has-ability")
        coinsHeader.innerText = `Coins: ${coinsAmount}`;
        alert("Purchase succesfull");
    }else{
        alert(`You don't have enough coins, you need ${1000 - coinsAmount} more coins`);
    }
});

buyAbility1Button.addEventListener("click", function(event) {
    if(hasAbility1 == "true"){
      alert("You already have this");
    }else if(coinsAmount >= 2500){
        coinsAmount = coinsAmount - 2500;
        localStorage.setItem("coins", coinsAmount);
        hasAbility1 = true;
        localStorage.setItem("has-ability1", hasAbility1);
        hasAbility1 = localStorage.getItem("has-ability1")
        coinsHeader.innerText = `Coins: ${coinsAmount}`;
        alert("Purchase succesfull");
    }else{
        alert(`You don't have enough coins, you need ${2500 - coinsAmount} more coins`);
    }
});

buyAbility2Button.addEventListener("click", function(event) {
    if(hasAbility2 == "true"){
      alert("You already have this");
    }else if(coinsAmount >= 10000){
        coinsAmount = coinsAmount - 10000;
        localStorage.setItem("coins", coinsAmount);
        hasAbility2 = true;
        localStorage.setItem("has-ability2", hasAbility2);
        hasAbility2 = localStorage.getItem("has-ability2")
        coinsHeader.innerText = `Coins: ${coinsAmount}`;
        alert("Purchase succesfull");
    }else{
        alert(`You don't have enough coins, you need ${10000 - coinsAmount} more coins`);
    }
});