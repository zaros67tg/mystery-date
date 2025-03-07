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
            box.onclick = () => selectOption(index, option);
            background.appendChild(box);
        });
    }
}

function getOptions() {
    if (choices.length === 0) return ["Open Budget 💸", "Under 1K 💰"];
    if (choices.length === 1) return ["In City 🏙️", "Outside City 🚗"];
    if (choices.length === 2 && choices[1] === 1) return ["Movie 🎬", "Gaming Zone 🎮"]; // Special Case
    if (choices.length === 2) return ["Movie 🎬", "Gaming Zone 🎮"];
    if (choices.length === 3) return ["Restaurant 🍽️", "Street Food 🍜"];
    if (choices.length === 4) return ["Solo Trip 🏝️", "Meet Friends 👥"];
    return [];
}

function selectOption(index, selectedText) {
    choices.push(index);  // Store the choice

    // Show popup
    showDialogue(selectedText);
}

function showDialogue(selectedText) {
    const overlay = document.getElementById("overlay");
    const dialogueBox = document.getElementById("dialogue-box");
    const dialogueText = document.getElementById("dialogue-text");

    overlay.style.display = "flex";
    dialogueBox.style.display = "block";

    // Display selected option
    dialogueText.innerHTML = `<strong>${selectedText}</strong>`;

    // Show next button
    document.getElementById("next-btn").style.display = "block";
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
