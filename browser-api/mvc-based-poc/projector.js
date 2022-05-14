import { EventType } from "./EventType.js"

export { Projector }

const Projector = controller => {
    const paragraph  = document.getElementById("contentRender");
    const inputField = document.getElementById("contentInput");

    (function bindNavigation() {
        for (let elem of document.getElementsByTagName("nav")) {
            elem.addEventListener("click", () => controller.onViewChange(EventType.NAVIGATION, elem.innerHTML));
        }
    })();

    (function bindInput() {
        inputField.addEventListener("keyup", () => controller.onViewChange(EventType.CONTENT, inputField.value));
    })();

}