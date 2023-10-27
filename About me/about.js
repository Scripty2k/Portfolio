// Function to show the popup
// Show the popup after 2 seconds (2000 milliseconds)
setTimeout(showPopup, 20000);

// Function to close the popup
function closePopup() {
    var popup = document.getElementById('myPopup');
    popup.style.display = 'none';
}

function showPopup() {
    var popup = document.getElementById('myPopup');
    popup.style.display = 'block';
}

type="text/javascript">
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    }