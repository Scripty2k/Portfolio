document.getElementById("mainTitle").innerText = "Point and Click adventure";
const offsetCharacter = 16;
const sec = 1000;
const gameWindow = document.getElementById("gameWindow");
const mainCharacter = document.getElementById("mainCharacter");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

const backtalk = document.getElementById("backtalk");
const counterCharacter = document.getElementById("counterCharacter");

const characterAudio = document.getElementById("characterAudio");
const counterAudio = document.getElementById("counterAudio");

gameWindow.onclick = function           

(e) {
    if (mainCharacterSpeech.style.opacity == 0) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.

        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";

        console.log(e.target.id);
        switch (e.target.id) {
            case "door1":
                showMessage(mainCharacterSpeech, characterAudio, "this door is closed.. DAMN YOU DOOR!");
                break;
            case "door2":
                showMessage(mainCharacterSpeech, characterAudio, "Nobody is here... what should I do?");
                break;
            case "statue":
                showMessage(mainCharacterSpeech, characterAudio, "ow boring statue...");
                setTimeout(function () { counterCharacter.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4 * sec, backtalk, counterAudio, "No you are boring stupid!");
                setTimeout(showMessage, 8 * sec, mainCharacterSpeech, characterAudio, "Ow I am so sorry. <br>I didn't know you could talk.");
                setTimeout(function () { counterCharacter.style.opacity = 0; }, 12 * sec);
                break;
            default:
                hideMessage(mainCharacterSpeech, characterAudio);
                hideMessage(backtalk, counterAudio);
                break;
        }
    }
}

function showMessage(targetBubble, targetAudio, message) {
    
    
    
    targetAudio.play();
    targetAudio.currentTime = 0;
    targetBubble.innerHTML = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetAudio);
}

function hideMessage(targetBubble, targetAudio) {
    targetAudio.pause();
    targetBubble.innerHTML = "...";
    targetBubble.style.opacity = 0;
}