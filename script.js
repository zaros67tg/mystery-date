let step = 0;
let choices = [];

// Probabilities for certain choices
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
    if (options.length === 2) {
        options.forEach((option, index) => {
            let box = document.createElement("div");
            box.classList.add("treasure-box");
            box.innerHTML = "🎁";
            box.onclick = () => selectOption(option, index);
            background.appendChild(box);
        });
    }
}

function getOptions() {
    if (choices.length === 0) return weightedChoice(probabilities.budget);
    if (choices.length === 1) return ["In City 🏙️", "Outside City 🚗"];
    if (choices.length === 2 && choices[1] === "In City 🏙️") return weightedChoice(probabilities.activity); // Special Case
    if (choices.length === 2) return ["Movie 🎬", "Gaming Zone 🎮"];
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
        if (rand < cumulative) return [option, options.find(o => o !== option)];
    }
    return options;
}

function selectOption(choice, index) {
    choices.push(choice);
    showDialogue(choice, index);
}

function showDialogue(selected, index) {
    const overlay = document.getElementById("overlay");
    const dialogueBox = document.getElementById("dialogue-box");
    const dialogueText = document.getElementById("dialogue-text");
    
    overlay.style.display = "flex";
    dialogueBox.style.display = "block";

    let options = getOptions();
    let notSelected = options.find(o => o !== selected);
    
    dialogueText.innerHTML = `<b>${selected}</b>`;
    dialogueText.innerHTML += `<div class='not-selected'>${notSelected}</div>`;
    dialogueText.innerHTML += "<br><button onclick='closeOverlay()'>Next</button>";
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
    showBoxes();
}

function restart() {
    choices = [];
    closeOverlay();
    showBoxes();
}
