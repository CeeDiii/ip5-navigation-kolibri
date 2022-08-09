import { EventType } from './EventType.js';
import { NavigationEvent } from "./NavigationEvent.js";

export { NavigationController }


/**
 * Controller that coordinates communication between model and projector
 *
 * @typedef NavigationControllerType
 * @property { (function(navEvent: NavigationEvent) => void) } addModelChangeListener - register a callback function as a listener for model changes.
 *              The callback will be executed, when a model change occurs.
 * @property { (newNavPoint:String) => Boolean } addNavigationPoint - Delegates function to the model.
 *              Takes a string with the identifier for a new Navigation Point. Add the Navigation Point to the model, if it does not already exist. 
 *              Return true, if the operation was successful.
 * @property { function(): String } getLocation - Delegates function to the model
 *              Get the currently selected location of the navigation.
 * @property { (navPoint:String, newIndex:number) } setOrderOfNavigationPoint - Delegates function to the model
 *              Change the order of the navigation. After successfully executing this function, the navPoint will have the index of newIndex. 
 * @property { (function(): [String]) } getNavigationPoints - Delegates function to the model.
 *              Returns a list of all Navigation Points.
 * @property { (pageName:String, currentContent:DOMString) => void } savePageContent - Delegates function to the model.
 *              Saves the provided DOMString into the model under the key of the pageName.
 * @property { (pageName) => DOMString } getPageContent - Delegates function to the model.
 *              Returns the pageContent under the given pageName. 
 *              If no page content is found, null is returned.
 * @param   { NavigationModelType } model - the navigation model this controller coordinates
 */
const NavigationController = model => {
    const modelChangeListeners = [];

    // Use native browser functionality with hashes to reload content from model
    window.onhashchange = () => {
        model.setLocation(window.location.hash);
    }

    // Sending event after document is loaded for content to render
    window.onload = () => {
        modelChangeListeners.forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, window.location.hash, window.location.hash)));
    }

    /**
     * Add a callback function that will be executed when a model change occurs
     *
     * @callback {callback: onChange<EventType, T>} callback - function that will be called
     */
    const addModelChangeListener = (callback) => {
        modelChangeListeners.push(callback);
    }

    /**
     * Notify observers that a model change occurred
     *
     * @param {NavigationEvent} navEvent
     *
     */
    const onModelChange = navEvent => {
        if (navEvent.getEventType() === EventType.PAGE_CHANGE && window.location.hash !== navEvent.getHash()) {
            window.location.hash = navEvent.getValue();
        }
        modelChangeListeners.forEach(callback => callback(navEvent));
    }

    model.addNavigationListener(onModelChange);

    return {
        addModelChangeListener,
        getLocation: () => model.getLocation(),
        addNavigationPoint: (newNavPoint, callback) => { 
            addModelChangeListener(callback);
            return model.addNavigationPoint(newNavPoint); 
        },
        setOrderOfNavigationPoint: (navPoint, newIndex) =>  model.setOrderOfNavigationPoint(navPoint, newIndex),
        getNavigationPoints: () => model.getNavigationPoints(),
        savePageContent: (pageName, currentContent) => model.savePageContent(pageName, currentContent),
        getPageContent: (pageName) => model.getPageContent(pageName)
    }
}