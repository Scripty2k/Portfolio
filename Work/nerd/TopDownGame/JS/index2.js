document.getElementById("mainTitle").innerText = "Point and click adventure";

const offsetCharacter = 16;

const sec = 1000;

const mainCharacter = document.getElementById("mainCharacter");
const gameWindow = document.getElementById("gameWindow");
const characterAudio = document.getElementById("characterAudio");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

const backtalk = document.getElementById("backtalk");
const counterAudio = document.getElementById("counterAudio");
const counterCharacter = document.getElementById("counterCharacter");
let tilemapIMG = document.getElementById("tilemapIMG");


let inventory = [];
const inventoryList = document.getElementById("inventoryList");

gameWindow.onclick = function (e) {
    if (mainCharacterSpeech.style.opacity == 0 && backtalk.style.opacity == 0) {
        var rect = gameWindow.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";

        switch (e.target.id) {
            case "door1":
                if (checkItem("rusty key")) {
                    showSpeech(mainCharacterSpeech, characterAudio, "OMG it fits.. This door now open.");
                    setTimeout(function () { tilemapIMG.src = "img/tilemap2.jpg" }, 1 * sec);
                    //window.location.href = "pages/insideHouse2.html";
                } else {
                    showSpeech(mainCharacterSpeech, characterAudio, "this is door one.<br> And it's locked dummy...");
                }
                break;
            case "door2":
                showSpeech(mainCharacterSpeech, characterAudio, "noboby is home...<br> Come back later..");
                break;
            case "tree":
                showSpeech(mainCharacterSpeech, characterAudio, "Nice tree... looking good.. You come here often? nudge nudge...");
                break;
            case "statue":

                showSpeech(mainCharacterSpeech, characterAudio, "What a borring statue...");
                setTimeout(function () { counterCharacter.style.opacity = 1; }, 4 * sec);
                setTimeout(showSpeech, 4 * sec, backtalk, counterAudio, "No you are borring..");
                setTimeout(showSpeech, 8 * sec, mainCharacterSpeech, characterAudio, "Ow sorry I didn't know you could speak.");
                setTimeout(showSpeech, 12 * sec, backtalk, counterAudio, "Here you go a rusty key.. go fuck off");
                getItem("rusty key", "rustyKey");
                setTimeout(function () { counterCharacter.style.opacity = 0; }, 16 * sec);
                break;
            case "platform":
                document.getElementById("platform").style.opacity = 0.5;
                break;
            default:
                // do something when it doesn't have a case
                document.getElementById("platform").style.opacity = 1;
                hideSpeech();
                break;
        }
    }
}

function showSpeech(targetBubble, targetAudio, dialogue) {
    targetBubble.style.opacity = 1;
    targetBubble.innerHTML = dialogue;
    targetAudio.currentTime = 0;
    targetAudio.play();
    setTimeout(hideSpeech, 2 * sec, targetBubble, targetAudio);
}

function hideSpeech(targetBubble, targetAudio) {
    targetBubble.style.opacity = 0;
    targetBubble.innerHTML = "...";
    targetAudio.pause();
}


function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }
}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(itemName, itemId) {
    let listItem = document.createElement("li");
    listItem.id = itemId;
    listItem.appendChild(document.createTextNode(itemName));
    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();
}

function inOrOut() {

}