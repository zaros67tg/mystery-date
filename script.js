let step = 0;
let choices = [];

document.addEventListener("DOMContentLoaded", function () {
    showBoxes();
});

function showBoxes() {
    const background = document.getElementById("background");
    background.innerHTML = ""; 

    let options = getOptions();
    if (options.length === 2) {
        options.forEach((option, index) => {
            let box = document.createElement("div");
            box.classList.add("treasure-box");
            box.innerHTML = "🎁";
            box.onclick = () => selectOption(index, option, options);
            background.appendChild(box);
        });
    }
}

// Probability-boosted options
function getOptions() {
    if (choices.length === 0) return ["Under 1K 💰", "Open Budget 💸"]; // 100% for "Under 1K"
    if (choices.length === 1) return ["In City 🏙️", "Outside City 🚗"];
    
    if (choices.length === 2) {
        return Math.random() < 0.8 ? ["Gaming Zone 🎮", "Movie 🎬"] : ["Movie 🎬", "Gaming Zone 🎮"]; // 80% chance for gaming
    }
    
    if (choices.length === 3) return ["Restaurant 🍽️", "Street Food 🍜"];
    if (choices.length === 4) return ["Long Ride 🏍️", "Meet Friends 👥"];
    return [];
}

function selectOption(index, selectedText, options) {
    choices.push(index);  // Store the choice

    // Show popup & what was NOT selected
    let notSelectedText = options[1 - index];  
    showDialogue(selectedText, notSelectedText);
}

function showDialogue(selectedText, notSelectedText) {
    const overlay = document.getElementById("overlay");
    const dialogueBox = document.getElementById("dialogue-box");
    const dialogueText = document.getElementById("dialogue-text");
    const notSelectedBox = document.getElementById("not-selected");

    overlay.style.display = "flex";
    dialogueBox.style.display = "block";

    // Display selected option
    dialogueText.innerHTML = `<strong>${selectedText}</strong>`;

    // Show what was NOT selected
    notSelectedBox.style.display = "block";
    notSelectedBox.innerText = `❌ ${notSelectedText}`;
}

function nextStep() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
    document.getElementById("not-selected").style.display = "none";
    showBoxes();
}

function restart() {
    choices = [];
    nextStep();
}
