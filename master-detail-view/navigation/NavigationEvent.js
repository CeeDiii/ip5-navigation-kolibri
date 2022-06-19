import { EventType } from "./EventType.js";
export { NavigationEvent }

/**
 * Navigation event containing a type and any value
 *
 * @typedef {Object} NavigationEvent
 * @param   {EventType} type
 * @param   {string} val
 * 
 */
const NavigationEvent = (type, val) => {
    if (!val.startsWith("#")) val = '#' + val;

    const eventType = type;
    const hash = val;
    const value = val.substring(1);

    return {
        getEventType: () => { return eventType; },
        getHash:      () => { return hash; },
        getValue:     () => { return value; }
    }

}