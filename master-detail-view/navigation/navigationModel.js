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
    const pageContents        = new Map();

    const addNavigationPoint = newNavPoint => {
        const navPoints = navigationPoints.getObs(VALUE).getValue();
        if(navPoints.length > 0 && navPoints.filter(navObs => navObs.getObs(VALUE).getValue().toLowerCase() === newNavPoint).length > 0) return false;
        const navPointAttr = Attribute(newNavPoint);
        navPointAttr.setConverter(attr => attr.toString());
        navPoints.push(navPointAttr);
        navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, newNavPoint, newNavPoint)));
        return true;
    }

    addNavigationPoint(homePage);

    return {
        addNavigationListener: callback => {
            navigationListeners.getObs(VALUE).getValue().push(callback);
        },
        addNavigationPoint,
        getLocation: () => location.getObs(VALUE).getValue(),
        setLocation: newLocation => {
            const lastLocation = location.getObs(VALUE).getValue();
            if(lastLocation === newLocation) return;
            location.getObs(VALUE).setValue(newLocation);
            navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, location.getObs(VALUE).getValue(), lastLocation)));
        },
        getNavigationPoints: () => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            const retNavPoints = [];
            navPoints.forEach(value => {
                retNavPoints.push(value.getObs(VALUE).getValue());
            });
            return retNavPoints;
        },

        setOrderOfNavigationPoint: (navPoint, newIndex) => {
            const navPoints = navigationPoints.getObs(VALUE).getValue();
            const current = navPoints.findIndex(navObs => navObs.getObs(VALUE).getValue() === navPoint);
            if (current >= 0 && current != newIndex) {
                navPoints.splice(newIndex, 0, navPoints.splice(current, 1)[0]);
                navigationListeners.getObs(VALUE).getValue().forEach(callback => callback(NavigationEvent(EventType.NAVBAR_CHANGE, navPoint, navPoint)));
            }
        },

        savePageContent: (pageName, currentContent) => {
            pageContents.set(pageName, currentContent);
        },
        getPageContent: (pageName) => {
            return pageContents.get(pageName);
        }
    }
}

//@TODO comment / document