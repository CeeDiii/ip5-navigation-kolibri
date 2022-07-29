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
const NavigationEvent = (type, val, lastVal) => {
    if (!val.startsWith("#")) val = '#' + val;
    if (!lastVal.startsWith("#")) lastVal = '#' + lastVal;


    const eventType = type;
    const hash = val;
    const value = val.substring(1);
    const lastHash = lastVal;
    const lastValue = lastVal.substring(1);

    return {
        getEventType: () => { return eventType; },
        getHash:      () => { return hash; },
        getValue:     () => { return value; },
        getLastHash:  () => { return lastHash; },
        getLastValue: () => { return lastValue; }
    }

}