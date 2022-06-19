export { NavigationProjector }

const NavigationProjector = controller => {
    //@BIG TODO: implement projector
    const nav = document.getElementById('nav');
    for(let item of controller.getNavigationPoints()) {
        const a = document.createElement('a');
        a.setAttribute('href', '#' + item)
        a.innerText = item;
        nav.appendChild(a);
    }

    controller.addModelChangeListener((navEvent) => console.log(navEvent.getHash()));
}