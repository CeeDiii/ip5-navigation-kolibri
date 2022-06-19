import { EventType } from "./EventType.js";

export { NavigationProjector }

const NavigationProjector = controller => {
    //@BIG TODO: implement beautiful UI and project it

    const head = document.getElementsByTagName('head')[0];
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './navigation/navigationProjector.css';
    head.appendChild(styles);


    const projectNavigation = () => {
        const nav = document.getElementById('nav');
        const ul = document.createElement('ul');
        nav.innerHTML = '';
        for(let item of controller.getNavigationPoints()) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', '#' + item)
            a.innerText = item;
            li.appendChild(a);
            ul.appendChild(li);
        }
        nav.appendChild(ul);
    }

    controller.addModelChangeListener((navEvent) => {
        if (navEvent.getEventType() === EventType.NAVBAR_CHANGE) projectNavigation();
    });

    return {
        projectNavigation
    }
}