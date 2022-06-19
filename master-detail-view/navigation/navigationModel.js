import { Attribute, VALUE } from "../kolibri/presentationModel.js";
import { EventType } from "./EventType.js";
import { NavigationEvent } from "./NavigationEvent.js";

export { Navigation }

/**
 * Model containing the application navigation-data
 *
 * @typedef {Object} model
 * @param   {String} homePage
 */
const Navigation = (homePage) => {
    const navigationPoints    = Attribute([]);
    const location            = Attribute(homePage);
    const navigationListeners = Attribute([]);

    navigationPoints.getObs(VALUE).getValue().push(homePage);

    return {
        addNavigationListener: callback => {
            navigationListeners.getObs(VALUE).getValue().push(callback);
        },
        getLocation: () => location.getObs(VALUE).getValue(),
        setLocation: newLocation => {
            if(location.getObs(VALUE).getValue() === newLocation) return;
            location.getObs(VALUE).setValue(newLocation);
            navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, location.getObs(VALUE).getValue())));
        },
        addNavigationPoint: newNavPoint => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            if(navPoints.length > 0 && navPoints.find(navPoint => navPoint !== newNavPoint) === undefined) return false;
            navPoints.push(newNavPoint);
            navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, newNavPoint)));
            return true;
        },
        getNavigationPoints: () => navigationPoints.getObs(VALUE).getValue(),

        setOrderOfNavigationPoint: (navPoint, newIndex) => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            const current = navPoints.indexOf(navPoint);
            if (current >= 0 && current != newIndex) {
                navPoints.splice(newIndex, 0, navPoints.splice(current, 1)[0]);
                navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, navPoint)));
            }
        }
    }
}

//@TODO comment / document