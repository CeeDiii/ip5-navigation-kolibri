let state = { name: "" }

let content = document.getElementById("content")

function render(state) {
    content.innerHTML = state.name;
}

// Set initial state and render app for the first time
(function initialize() {
    window.history.replaceState(state, null, "");
    render(state);
})();

// Update state, history, and user interface
function handleButtonClick(event) {
    if (state.name !== event.target.innerHTML) {
        state.name = event.target.innerHTML;
        window.history.pushState(state, null, "");
        render(state);
    }
}
  
// Connect the section to the handler above to trigger on click
sections = document.getElementsByTagName("section");
for (let section of sections) {
    section.addEventListener("click", handleButtonClick);
}

// Tell your browser to give you old state and re-render on back
window.onpopstate = function (event) {
if (event.state) { state = event.state; }
    render(state);
};


