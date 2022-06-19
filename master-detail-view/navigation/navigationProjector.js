export { NavigationProjector }

const NavigationProjector = controller => {
    //@BIG TODO: implement projector
    let returnValue = '';
    for(let item of controller.getNavigationPoints()) {
        returnValue += ' ' + item;
    }

    controller.addModelChangeListener(() => console.log("hello"));

    return '<p>irgend öppis ' + returnValue + '</p>';
}