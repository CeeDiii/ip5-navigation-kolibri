const firstState =   { id: 1}
const secondState =  { id: 2}
const thirdState =   { id: 3}
const replaceState = { id: 4}

// current stack history = []
// index=0        => head of stack
// index=length-1 => tail of stack

window.history.pushState(firstState, "", "#home");              // history=[firstState]
window.history.pushState(secondState, "", "#about");            // history=[secondState, firstState]
window.history.pushState(thirdState, "", "#gallery");           // history=[thirdState, secondState, firstState]
window.history.replaceState(replaceState, "", "#contact");      // history=[replaceState, secondState, firstState] => thirdState is replaced by replaceState

console.log(window.history.state.id);                           // => 4

window.onpopstate = e => {
    console.log("Pop: " + e.state.id);
}

window.history.back()       // => 2
window.history.forward()    // => 4
