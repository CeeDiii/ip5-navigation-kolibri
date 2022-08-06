import { Attribute, VALUE } from "../kolibri/presentationModel.js";
import { EventType } from "./EventType.js";
import { NavigationEvent } from "./NavigationEvent.js";

export { Navigation }

/**
 * Model containing the application navigation-data
 *
 * @typedef NavigationModelType
 * @property { (newNavPoint:String) => Boolean } addNavigationPoint - takes a string with the identifier for a new Navigation Point.
 *              Add the Navigation Point to the model, if it does not already exist. Return true, if the operation was successful.
 * @property { (function(navEvent: NavigationEvent) => void) } addNavigationListener - add a callback function as a listener for Navigation Events.
 *              The callback will be executed, when a navigation event occurs.
 * @property { function(): String } getLocation - get the currently selected location of the navigation.
 * @property { (newLocation:String) => void } setLocation - set the currently selected location of the navigation.
 * @property { (navPoint:String, newIndex:number) } setOrderOfNavigationPoint - change the order of the navigation.
 *              After successfully executing this function, the navPoint will have the index of newIndex. 
 * @property { (function(): [String]) } getNavigationPoints - returns a list of all Navigation Points.
 * @property { (pageName:String, currentContent:DOMString) => void } savePageContent - saves the provided DOMString into the model under the key of the pageName.
 * @property { (pageName) => DOMString } getPageContent - returns the pageContent under the given pageName. 
 *              If no page content is found, null is returned.
 * @param   { String } homePage - the string that represents the identifier of the homepage
 */
const Navigation = (homePage) => {
    const navigationPoints    = Attribute([]);
    const location            = Attribute(homePage);
    const navigationListeners = [];
    const pageContents        = new Map();

    const addNavigationPoint = newNavPoint => {
        const navPoints = navigationPoints.getObs(VALUE).getValue();
        const navPointExists = navPoints.findIndex(navObs => navObs.getObs(VALUE).getValue().toLowerCase() === newNavPoint.toLowerCase());
        if(navPointExists !== -1) return false;
        const navPointAttr = Attribute(newNavPoint);
        navPointAttr.setConverter(attr => attr.toString());
        navPoints.push(navPointAttr);
        navigationListeners.forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, newNavPoint, newNavPoint)));
        return true;
    }

    addNavigationPoint(homePage);

    return {
        addNavigationListener: callback => {
            navigationListeners.push(callback);
        },
        getLocation: () => location.getObs(VALUE).getValue(),
        setLocation: newLocation => {
            const lastLocation = location.getObs(VALUE).getValue();
            if(lastLocation.toLowerCase() === newLocation.toLowerCase()) return;
            location.getObs(VALUE).setValue(newLocation);
            navigationListeners.forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, location.getObs(VALUE).getValue(), lastLocation)));
        },
        addNavigationPoint,
        setOrderOfNavigationPoint: (navPoint, newIndex) => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            const current = navPoints.findIndex(navObs => navObs.getObs(VALUE).getValue().toLowerCase() === navPoint.toLowerCase());
            if (current >= 0 && current != newIndex) {
                const currentItem = navPoints.splice(current, 1)[0]
                navPoints.splice(newIndex, 0, currentItem);
                navigationListeners.forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, navPoint, navPoint)));
            }
        },
        getNavigationPoints: () => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            const retNavPoints = [];
            navPoints.forEach(value => {
                retNavPoints.push(value.getObs(VALUE).getValue());
            });
            return retNavPoints;
        },

        savePageContent: (pageName, currentContent) => {
            pageContents.set(pageName, currentContent);
        },
        getPageContent: (pageName) => {
            return pageContents.get(pageName);
        }
    }
}