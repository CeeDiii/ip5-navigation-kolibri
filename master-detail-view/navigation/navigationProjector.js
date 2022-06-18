export { Projector }

const Projector = controller => {
    //@BIG TODO: implement projector
    let returnValue = '';
    for(let item of controller.getNavigationPoints()) {
        returnValue += ' ' + item;
    }
    return '<p>irgend öppis ' + returnValue + '</p>';
}