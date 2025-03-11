let step = 0;
let choices = [];

// Probabilities for weighted choices
const probabilities = {
    budget: { "Under 1K 💰": 1.0, "Open Budget 💸": 0.0 },
    activity: { "Gaming Zone 🎮": 0.8, "Movie 🎬": 0.2 }
};

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
    showBoxes();
});

function showBoxes() {
    const background = document.querySelector(".background");
    background.innerHTML = ""; 
    
    let options = getOptions();
    options.forEach(option => {
        let box = document.createElement("div");
        box.classList.add("treasure-box");
        box.innerHTML = "🎁";
        box.onclick = () => selectOption(option);
        background.appendChild(box);
    });
}

function getOptions() {
    if (choices.length === 0) return weightedChoice(probabilities.budget);
    if (choices.length === 1) return ["In City 🏙️", "Outside City 🚗"];
    if (choices.length === 2) return weightedChoice(probabilities.activity);
    if (choices.length === 3) return ["Restaurant 🍽️", "Street Food 🍜"];
    if (choices.length === 4) return ["Long Ride 🏍️", "Meet Friends 👥"];
    return [];
}

function weightedChoice(probabilityObj) {
    const options = Object.keys(probabilityObj);
    const rand = Math.random();
    let cumulative = 0;
    for (let option of options) {
        cumulative += probabilityObj[option];
        if (rand < cumulative) return [option];
    }
    return [options[0]];
}

function selectOption(choice) {
    choices.push(choice);
    showDialogue(choice);
}

function showDialogue(selected) {
    const overlay = document.getElementById("overlay");
    const dialogueBox = document.getElementById("dialogue-box");
    const dialogueText = document.getElementById("dialogue-text");
    
    overlay.style.display = "flex";
    dialogueBox.style.display = "block";

    dialogueText.innerHTML = `<b>${selected}</b><br><button onclick='nextStep()'>Next</button>`;
}

function nextStep() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
    showBoxes();
}

function restart() {
    choices = [];
    nextStep();
}
