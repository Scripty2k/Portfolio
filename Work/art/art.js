// Function to show the popup
// Show the popup after 2 seconds (2000 milliseconds)
setTimeout(showPopup, 20000);

// Function to close the popup
function closePopup() {
    let popup = document.getElementById('myPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function showPopup() {
    let popup = document.getElementById('myPopup');
    if (popup) {
        popup.style.display = 'block';
    }
}

setTimeout(showPopup, 20000);