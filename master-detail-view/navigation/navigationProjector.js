import { EventType } from "./EventType.js";

export { NavigationProjector }

const NavigationProjector = controller => {
    //@BIG TODO: implement beautiful UI and project it

    const projectNavigation = () => {
        const nav = document.getElementById('nav');
        nav.innerHTML = '';
        for(let item of controller.getNavigationPoints()) {
            const a = document.createElement('a');
            a.setAttribute('href', '#' + item)
            a.innerText = item;
            nav.appendChild(a);
        }
    }

    projectNavigation();

    controller.addModelChangeListener((navEvent) => {
        if (navEvent.getEventType() === EventType.NAVBAR_CHANGE) projectNavigation();
    });
}