let step = 0;
let choices = [];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
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
            box.onclick = () => selectOption(index + 1);
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

function selectOption(choice) {
    choices.push(choice);
    showDialogue();
}

function showDialogue() {
    const overlay = document.getElementById("overlay");
    const dialogueBox = document.getElementById("dialogue-box");
    const dialogueText = document.getElementById("dialogue-text");
    
    overlay.style.display = "flex";
    dialogueBox.style.display = "block";

    let options = getOptions();
    if (options.length === 0) {
        dialogueText.innerHTML = choices[4] === 1 ? "Enjoy your Solo Trip! 🏝️" : "Have fun meeting friends! 👥";
        dialogueText.innerHTML += "<br><button onclick='restart()'>Restart</button>";
        confetti();
        playMusic();
    } else {
        dialogueText.innerHTML = "Next Choice!";
        dialogueText.innerHTML += "<br><button onclick='closeOverlay()'>Next</button>";
    }
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

function playMusic() {
    const audio = document.getElementById("background-music");
    if (audio.paused) {
        audio.play().catch(error => console.error("Autoplay prevented:", error));
    }
}
