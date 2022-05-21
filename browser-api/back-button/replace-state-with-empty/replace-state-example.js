emptyState = []
for (let i = 0; i < 99; i++) { // fill n > history.size emptyState into history
    window.history.pushState(emptyState, "", "");
}

window.onpopstate = () => {
    window.history.replaceState(emptyState, "", ""); // replace every new entry with the empty state
}