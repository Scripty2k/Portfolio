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

