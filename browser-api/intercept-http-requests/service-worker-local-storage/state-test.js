let globalState = 'initial';
let counter = 0;

function changeState() {
    globalState = 'changed ' + ++counter;

    localStorage.setItem("global", globalState);
    localStorage.setItem("count", counter);
}

(function recoverState() {
    if(localStorage.getItem("global") !== null) {
        globalState = localStorage.getItem("global");
    }
    if(localStorage.getItem("count") !== null) {
        counter = localStorage.getItem("count");
    }
})();