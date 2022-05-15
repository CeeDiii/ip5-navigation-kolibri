import { EventType } from "./EventType.js"

export { Projector }

/**
 * Project content to view
 * 
 * @param {Controller} controller 
 */
const Projector = controller => {
    const paragraph  = document.getElementById("contentRender");
    const inputField = document.getElementById("contentInput");

    /**
     * register listeners for nav click events
     */
    (function bindNavigation() {
        for (let elem of document.getElementsByTagName("nav")) {
            elem.addEventListener("click", () => controller.onViewChange(EventType.NAVIGATION, elem.innerHTML));
        }
    })();

    /**
     * register listeners for the input keyup events
     */
    (function bindInput() {
        inputField.addEventListener("keyup", () => controller.onViewChange(EventType.CONTENT, inputField.value));
    })();

    /**
     * bind model to view via controller and 
     * add callback function that gets executed on change of the model
     */
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