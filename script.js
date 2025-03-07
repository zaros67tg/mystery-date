let step = 0;
let path = [];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
    showBoxes();
});

function showBoxes() {
    document.querySelector(".background").innerHTML = `
        <div class="treasure-box" onclick="selectOption(1)">🎁</div>
        <div class="treasure-box" onclick="selectOption(2)">🎁</div>
    `;
}

function selectOption(choice) {
    path.push(choice);
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("dialogue-box").style.display = "block";
    showDialogue();
}

function showDialogue() {
    const dialogueText = document.getElementById("dialogue-text");
    let options = "";

    if (path.length === 1) {
        options = path[0] === 1 ? "Your budget is Open Budget 💸" : "Your budget is Under 1K 💰";
    } else if (path.length === 2) {
        options = path[1] === 1 ? "Location: In City 🏙️" : "Location: Outside City 🚗";
    } else if (path.length === 3 && path[1] === 1) {
        options = path[2] === 1 ? "Special Case: Movie 🎬" : "Special Case: Gaming Zone 🎮";
    } else if (path.length === 3) {
        options = path[2] === 1 ? "Movie 🎬" : "Gaming Zone 🎮";
    } else if (path.length === 4) {
        options = path[3] === 1 ? "Restaurant 🍽️" : "Street Food 🍜";
    } else if (path.length === 5) {
        options = path[4] === 1 ? "Solo Trip 🏝️" : "Meet Friends 👥";
    } else if (path.length === 6) {
        options = path[5] === 1 ? "Enjoy your Solo Trip! 🏝️" : "Have fun meeting friends! 👥";
        confetti();
        playMusic();
    }

    dialogueText.innerHTML = options;
    if (path.length < 6) {
        dialogueText.innerHTML += "<br><button onclick='closeOverlay()'>Next</button>";
    } else {
        dialogueText.innerHTML += "<br><button onclick='restart()'>Restart</button>";
    }
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
    if (path.length < 6) {
        showBoxes();
    }
}

function restart() {
    path = [];
    closeOverlay();
    showBoxes();
}

function playMusic() {
    const audio = document.getElementById("background-music");
    if (audio.paused) {
        audio.play().catch(error => console.error("Autoplay prevented:", error));
    }
}
