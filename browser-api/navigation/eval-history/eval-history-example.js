let model = "Counter: ";
let counter = 0;

function pushToHistory() {
    counter++;
    const state = {
        script: "navigate('"+ model + counter + "')"
    }
    navigate(model + counter)
    history.pushState(state, "", "");
}

function navigate(newContent) {
    document.getElementById("content").innerText = newContent;
}

window.onpopstate = (event) => {
    eval(event.state.script);
}