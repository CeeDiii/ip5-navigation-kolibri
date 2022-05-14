const textField = document.getElementById("textField");

function refreshPage() {
    location.reload();
}

function safeToLocalStorage(text) {
    localStorage.setItem("yourInput", text);
}

textField.addEventListener("change",() => {
    safeToLocalStorage(textField.value);
})

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("yourInput") !== null) {
        textField.value = localStorage.getItem("yourInput");
        document.getElementById("info").textContent = "The following Text was successfully loaded from the local Storage: " + localStorage.getItem("yourInput");
    }
});