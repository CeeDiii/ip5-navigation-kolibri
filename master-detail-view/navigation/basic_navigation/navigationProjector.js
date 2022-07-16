import { EventType } from "../EventType.js";

export { NavigationProjector }

const NavigationProjector = controller => {

    const head = document.getElementsByTagName('head')[0];
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './navigation/basic_navigation/navigationProjector.css';
    head.appendChild(styles);


    const projectNavigation = () => {
        const nav = document.getElementById('nav');
        const div = document.createElement('div');
        const ul  = document.createElement('ul');

        div.classList.add('navigation');

        nav.innerHTML = '';
        for(let item of controller.getNavigationPoints()) {
            const li   = document.createElement('li');
            const a    = document.createElement('a');
            const icon = document.createElement('span');
            const img  = document.createElement('img');
            const text = document.createElement('span');

            li.classList.add('list');
            if(window.location.hash === '#' + item) {
                li.classList.add('active')
            }
            li.id = item;
            a.setAttribute('href', '#' + item);
            icon.classList.add('icon');
            img.classList.add('icon');
            text.classList.add('text');
            text.innerText = item;

            icon.append(img);
            a.append(icon);
            a.append(text);
            li.append(a);
            ul.appendChild(li);
        }
        div.append(ul);
        nav.appendChild(div);

        const list = document.querySelectorAll('.list');
        function activate() {
            const innerList = document.querySelectorAll('.list');
            innerList.forEach((item) =>
                item.classList.remove('active')
            );
            this.classList.add('active');
        }
        list.forEach((item) =>
            item.addEventListener('click', activate)
        );
    }

    controller.addModelChangeListener((navEvent) => {
        if (navEvent.getEventType() === EventType.NAVBAR_CHANGE) projectNavigation();
        if (navEvent.getEventType() === EventType.PAGE_CHANGE) {
            const pageContent = controller.getPageContent(navEvent.getValue());
            if(pageContent !== undefined) {
                const oldContent = document.getElementById('content-wrapper');
                document.getElementById('content').replaceChild(pageContent, oldContent);
            }
        }
    });

    return {
        projectNavigation
    }
}