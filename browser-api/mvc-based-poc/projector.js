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
    const bookmarkButton = document.getElementById("bookmark");
    const divRenderBookmarks = document.getElementById("renderBookmarks");
    const bookmarks = new Map();
    let currentNavigationElement = document.getElementById("home");


    /**
     * Highlights the currently selected nav element in the nav bar
     * 
     * @param {HTMLElement} htmlNavElement - nav element to highlight when selected
     */
    function highlightCurrentNavigation(htmlNavElement) {
        currentNavigationElement.classList.remove("selected");
        currentNavigationElement = htmlNavElement;
        currentNavigationElement.classList.add("selected");
    }

    /**
     * register listener for bookmark button click events
     */
    (function bindBookmarkButton() {
        bookmarkButton.addEventListener("click", () => {
            controller.saveToBookmark(currentNavigationElement.innerHTML);
        })
    })();

    /**
     * Creates a table with key and value columns 
     * for all the bookmarks and renders it
     */
    function renderBookMarks() {
        if (divRenderBookmarks.hidden) divRenderBookmarks.hidden = false;
        divRenderBookmarks.innerHTML = ''; // clear div
        const h3 = document.createElement("h3");
        h3.textContent = "Bookmarks";
        divRenderBookmarks.appendChild(h3);
        const table = document.createElement("table");
        table.id = "bookmarks";
        const keyHeader = document.createElement("th");
        keyHeader.textContent = "Key";
        const valueHeader = document.createElement("th");
        valueHeader.textContent = "Value";
        const tbody = document.createElement("tbody");
        table.appendChild(keyHeader);
        table.appendChild(valueHeader);
        table.appendChild(tbody);
        for (let bookmark of bookmarks.entries()) {
            const tr = document.createElement('tr');
            tbody.appendChild(tr);
            const tdKey = document.createElement('td');
            tdKey.appendChild(document.createTextNode(bookmark[0]));
            const tdValue = document.createElement('td');
            tdValue.appendChild(document.createTextNode(bookmark[1]));
            tr.appendChild(tdKey);
            tr.appendChild(tdValue);
        }
        divRenderBookmarks.appendChild(table);
    }

    /**
     * register listeners for nav click events
     */
    (function bindNavigation() {
        for (let elem of document.getElementsByTagName("nav")) {
            elem.addEventListener("click", () => {
                controller.onViewChange(EventType.NAVIGATION, elem.innerHTML);
                highlightCurrentNavigation(elem);
            })
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
    (function bindController() {
        controller.addModelChangeListener((eventType, value) => {
            if (eventType === EventType.CONTENT && paragraph.innerText !== value) {
                paragraph.innerText = value;
            } else if (eventType === EventType.NAVIGATION) {
                inputField.value = "";
                paragraph.innerText = value.getContent();
                highlightCurrentNavigation(document.getElementById(value.getId()));
            } else if (eventType === EventType.BOOKMARK && value.value !== '') {
                if (bookmarks.get(value.key) === value.value) return;
                bookmarks.set(value.key, value.value);
                renderBookMarks();
            }
        });
    })();
}