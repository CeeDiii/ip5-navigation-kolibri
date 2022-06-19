import { EventType } from './EventType.js';

export { NavigationController }

const NavigationController = model => {
    const modelChangeListeners = [];

    // Set starting location
    window.location.hash = model.getLocation();

    // Use native browser functionality with hashes to reload content from model
    window.onhashchange = () => {
        if (model.getNavigationPoints().find(element => element === window.location.hash) === 'undefined') return;

        model.setLocation(window.location.hash)
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
            modelChangeListeners.push(callback);
            return model.addNavigationPoint(newNavPoint); 
        },
        getNavigationPoints: () => { return model.getNavigationPoints(); },
        setOrderOfNavigationPoint: (navPoint, newIndex) => { return model.setOrderOfNavigationPoint(navPoint, newIndex); }
    }
}

//@TODO comment / document