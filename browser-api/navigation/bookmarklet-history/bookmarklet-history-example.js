let model = "Counter: ";
let counter = 0;

function pushToHistory() {
    counter++;
    const state = {
        script: "javascript: navigate('"+ model + counter + "')"
    }
    navigate(model + counter)
    history.pushState(state, "", "");
}

function navigate(newContent) {
    document.getElementById("content").innerText = newContent;
}

window.onpopstate = (event) => {
    window.location = event.state.script;
}