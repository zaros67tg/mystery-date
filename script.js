let step = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded");
});

function showOptions(startStep) {
    step = startStep;
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("dialogue-box").style.display = "block";
    nextStep();
}

function nextStep() {
    console.log("Next step triggered, Step:", step);
    const dialogueText = document.getElementById("dialogue-text");
    let options = "";
    
    switch (step) {
        case 1:
            options = "Choose Budget:<br> <button onclick='goToStep(2)'>Open Budget 💸</button> <button onclick='goToStep(3)'>Under 1K 💰</button>";
            break;
        case 2:
        case 3:
            options = "Where?<br> <button onclick='goToStep(4)'>In City 🏙️</button> <button onclick='goToStep(5)'>Outside City 🚗</button>";
            break;
        case 4:
        case 5:
            options = "Choose Activity:<br> <button onclick='goToStep(6)'>Movie 🎬</button> <button onclick='goToStep(7)'>Gaming Zone 🎮</button>";
            break;
        case 6:
        case 7:
            options = "Food Choice:<br> <button onclick='goToStep(8)'>Restaurant 🍽️</button> <button onclick='goToStep(9)'>Street Food 🍜</button>";
            break;
        case 8:
        case 9:
            options = "Final Choice:<br> <button onclick='goToStep(10)'>Solo Trip 🏝️</button> <button onclick='goToStep(11)'>Meet Friends 👥</button>";
            break;
        case 10:
            options = "Enjoy your Solo Trip! 🏝️<br><button onclick='closeOverlay()'>Close</button>";
            confetti();
            playMusic();
            break;
        case 11:
            options = "Have fun meeting friends! 👥<br><button onclick='closeOverlay()'>Close</button>";
            confetti();
            playMusic();
            break;
        default:
            console.warn("Step out of range:", step);
            return;
    }
    dialogueText.innerHTML = options;
}

function goToStep(nextStep) {
    step = nextStep;
    nextStep();
}

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("dialogue-box").style.display = "none";
}

function playMusic() {
    const audio = document.getElementById("background-music");
    if (audio.paused) {
        audio.play().catch(error => console.error("Autoplay prevented:", error));
    }
}
