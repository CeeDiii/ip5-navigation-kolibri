let content = document.getElementById("content");
let sections = document.getElementsByTagName("section");
let localHistory = [];

// Connect the section to the handler above to trigger on click
for (let section of sections) {
    section.addEventListener("click", function() {
        const newHash = this.getAttribute("nav")
        if (newHash !== null && window.location.hash !== newHash) {
            updateHistory(newHash)
            render(newHash);
        }
    });
}

function updateHistory(curr) {
    if(localHistory[localHistory.length - 1] !== window.location.hash){
        localHistory.push(window.location.hash);
        window.location.hash = curr;
    }
}

function render(newContent) {
    content.innerHTML = newContent;
}

window.onhashchange = function() {
    if (window.innerDocClick) { // Do not trigger, if hash has changed within the page (E.g change rider within content)
        window.innerDocClick = false;
    } else {
        if (window.location.hash != '#undefined') {
            moveInHistory();
        } else {
            history.pushState("", document.title, window.location.pathname);
            location.reload();
        }
    }
}

// Handle the direction in which the browser moves
function moveInHistory() {
    if(window.location.hash === localHistory[localHistory.length - 1]) {
        localHistory = localHistory.slice(0, localHistory.length - 1);
    } else {
        localHistory.push(window.location.hash);
    }
    render(document.getElementById(window.location.hash.slice(1, window.location.hash.length)).getAttribute("nav"));
}

// Make sure the click was triggered outside of the document itself
document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}