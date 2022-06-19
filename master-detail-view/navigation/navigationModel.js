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
        setLocation: newValue => {
            if(location.getObs(VALUE).getValue() === newValue) return;
            location.getObs(VALUE).setValue(newValue);
            navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, location.getObs(VALUE).getValue())));
        },
        addNavigationPoint: newValue => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            if(navPoints.length > 0 && navPoints.find(element => element !== newValue) === undefined) return false;
            navPoints.push(newValue);
            navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, newValue)));
            return true;
        },
        getNavigationPoints: () => navigationPoints.getObs(VALUE).getValue(),
    }
}

//@TODO comment / document