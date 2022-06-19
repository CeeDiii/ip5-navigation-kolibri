import { EventType } from "./EventType.js";
export { NavigationEvent }

/**
 * Navigation event containing a type and any value
 *
 * @typedef {Object} NavigationEvent
 * @param   {EventType} type
 * @param   {Object} val
 * 
 */
const NavigationEvent = (type, val) => {
    const eventType = type;
    const value = val;

    return {
        getEventType: () => { return eventType; },
        getValue:     () => { return value; }
    }

}