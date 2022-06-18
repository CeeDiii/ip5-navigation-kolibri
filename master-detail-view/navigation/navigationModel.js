import { Attribute, VALUE } from "../kolibri/presentationModel";
import {EventType} from "./EventType";

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

    return {
        addNavigationListener: callback => {
            navigationListeners.push(callback);
        },
        getLocation: () => location.getObs(VALUE).getValue(),
        setLocation: newValue => {
            if(location.getObs(VALUE).getValue() === newValue) return;
            location.getObs(VALUE).setValue(newValue);
            navigationListeners.forEach(callback => callback(EventType.CONTENT, location.getObs(VALUE).getValue()));
        },
        addNavigationPoint: newValue => {
            if(navigationPoints.getObs(VALUE).find(newValue) === 'undefined') return false;
            navigationPoints.getObs(VALUE).push(newValue);
            navigationListeners.forEach(callback => callback(EventType.NAVIGATION, newValue));
            return true;
        },
        getNavigationPoints: () => navigationPoints.getObs(VALUE).getValue(),
    }
}