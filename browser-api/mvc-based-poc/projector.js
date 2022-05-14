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

    (function bindModel() {
        controller.addModelChangeListener((eventType, value) => {
            if (eventType === EventType.CONTENT) {
                if (paragraph.innerText === value) return;
                paragraph.innerText = value;
            } else if (eventType === EventType.NAVIGATION) {
                inputField.value = "";
                paragraph.innerText = value.getContent();
            }
        });
    })();



}