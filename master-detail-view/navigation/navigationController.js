import { EventType } from './EventType.js';
export { Controller }

const Controller = model => {
    const modelChangeListeners = [];

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
     * Notify view that a model change occurred
     *
     * @param {String} eventType - changed value
     * @param {String} newHash - changed value
     *
     */
    const onModelChange = (eventType, newHash) => {
        if (eventType === EventType.CONTENT && window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
        modelChangeListeners.forEach(callback => callback(eventType, newHash));
    }

    model.addNavigationListener(onModelChange);

    /**
     * Return all navigation points
     *
     */
    const getNavigationPoints = () => {
        return model.getNavigationPoints();
    }

    return {
        addModelChangeListener,
        getNavigationPoints
    }
}