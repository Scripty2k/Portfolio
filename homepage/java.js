// Function to show the popup
// Show the popup after 2 seconds (2000 milliseconds)
setTimeout(showPopup, 20000);

// Function to close the popup
function closePopup() {
    let popup = document.getElementById('myPopup');
    popup.style.display = 'none';
}

function showPopup() {
    let popup = document.getElementById('myPopup');
    popup.style.display = 'block';
}


setTimeout(showPopup, 20000);


// Add an event listener to the "Programming" section
document.getElementById('programming').addEventListener('click', function() {
    window.location.href = "../Work/work.html";
});

// Create a new Audio object with the path to your sound file
const clickSound = new Audio('click.wav');

// Function to play the sound
function playClickSound() {
    clickSound.play();
}

// Attach the click event listener to the entire document
document.addEventListener('click', playClickSound);