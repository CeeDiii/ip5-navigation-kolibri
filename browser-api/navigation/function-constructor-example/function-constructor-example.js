let model = "Counter: ";
let counter = 0;

function pushToHistory() {
    counter++;
    const state = {
        script: model + counter
    }
    navigate(model + counter)
    history.pushState(state, "", "");
}

const navigate = new Function('return function(newContent) { document.getElementById("content").innerText = newContent; }')();

window.onpopstate = (event) => {
    navigate(event.state.script);
}