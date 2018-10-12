// Global variables
let money = 0;
let assistants = 0;

const saveButton = document.querySelector('#save');
const loadButton = document.querySelector('#load');
saveButton.addEventListener('click', saveGame);
loadButton.addEventListener('click', loadGame);

const moneyDisplay = document.querySelector('#money');
const lemonadeButton = document.querySelector('#lemonade-button');

const assistantButton = document.querySelector('#assistants');
const assistantQuantityLabel = document.querySelector('#assistant-quantity');
const assistantCostLabel = document.querySelector('#assistant-cost');

lemonadeButton.addEventListener("click", function() { lemonadeClick(1); });
assistantButton.addEventListener("click", buyAssistant);

function lemonadeClick(amount) {
  money += amount;
  moneyDisplay.innerText = money;
}

function buyAssistant() {
  let cost = Math.floor(20 * Math.pow(1.1, assistants));    // works out the cost of this cursor
  if (money >= cost) {            // checks that the player can afford the assistant
    assistants = assistants + 1;  // increases number of assistants
    money -= cost;                // removes the money spent
    assistantQuantityLabel.innerText = assistants;  // updates the number of assistants for the user
    let nextCost = Math.floor(20 * Math.pow(1.1, assistants));  // works out the cost of the next assistant
    assistantCostLabel.innerText = nextCost;          // updates the assistant cost for the user
  }
}

function saveGame() {
  let save = {
    money: money,
    assistants: assistants
  };

  localStorage.setItem("save", JSON.stringify(save));
  console.log("Game saved!");
}

function loadGame() {
  let saveData = JSON.parse(localStorage.getItem("save"));
  console.log(saveData.time);
  if (typeof saveData.money !== undefined) { money = saveData.money; }
  console.log("Game loaded!");
}

function displayMoney() {
  money = Math.round(money * 10) / 10;
  moneyDisplay.innerText = money;                 // updates the amount of money for the user
}

window.setInterval(function() {
  lemonadeClick(assistants / 10);
  displayMoney();
}, 1000);