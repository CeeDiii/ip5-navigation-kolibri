import { EventType } from './EventType.js';
import { NavigationEvent } from "./NavigationEvent.js";

export { NavigationController }

const NavigationController = model => {
    const modelChangeListeners = [];

    // Set starting location
    if (window.localStorage.getItem('lastNavPoint') === null)    {
        window.location.hash = model.getLocation();
    } else {
        window.location.hash = window.localStorage.getItem('lastNavPoint');
    }

    // Use native browser functionality with hashes to reload content from model
    window.onhashchange = () => {
        if (model.getNavigationPoints().find(element => element === window.location.hash) === 'undefined') return;

        model.setLocation(window.location.hash);
        window.localStorage.setItem('lastNavPoint', model.getLocation());
    }

    // Sending event after document is loaded for content to render
    window.onload = () => {
        modelChangeListeners.forEach(callback => callback(NavigationEvent(EventType.PAGE_CHANGE, window.localStorage.getItem('lastNavPoint'), window.localStorage.getItem('lastNavPoint'))));
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
        addNavigationPoint: (newNavPoint, callback) => { 
            addModelChangeListener(callback);
            return model.addNavigationPoint(newNavPoint); 
        },
        getLocation: () => model.getLocation(),
        getNavigationPoints: () => model.getNavigationPoints(),
        setOrderOfNavigationPoint: (navPoint, newIndex) =>  model.setOrderOfNavigationPoint(navPoint, newIndex),
        savePageContent: (pageName, currentContent) => model.savePageContent(pageName, currentContent),
        getPageContent: (pageName) => model.getPageContent(pageName)
    }
}

//@TODO comment / document