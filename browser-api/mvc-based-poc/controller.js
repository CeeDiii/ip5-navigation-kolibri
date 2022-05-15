import { EventType } from './EventType.js';

export { Controller }

/**
 * Add a callback function that will be executed when an onChange event happens on an observable
 * 
 * @callback onChange<EventType,T>
 * @property {EventType} eventType - string that represents the emitted event type
 * @property {T} newValue - value that has been changed 
 */

/**
 * 
 * Delegates changes from the view to the model an vice versa
 * 
 * @param {Model} model 
 */
const Controller = model => {
    const modelListeners = [];


    /**
     *  Use native browser functionality with hashes to reload content from model
     */
    window.onhashchange = function() {
        if (window.location.hash != '#undefined') {
            setNavigationPointByCardId(window.location.hash.substring(1));
        }
    }

    /**
     * Add a callback function that will be executed when a model change occurs
     * 
     * @param {callback: onChange<EventType, T>} callback - function that will be called
     */
    function addModelChangeListener(callback) {
        modelListeners.push(callback);
    }

    /**
     * Notify view that a model change occurred
     * 
     * @param {EventType} eventType - type of the event
     * @param {T} value - changed value
     * @returns {void}
     * 
     */
    function onModelChange(eventType, value) {
        if (eventType === EventType.NAVIGATION && window.location.hash !== value.getId()) {
            window.location.hash = value.getId();
        }
        modelListeners.forEach(callback => {
            callback(eventType, value);
        });
    }

    /**
     * Register this controller as an observer in the model
     */
    (function registerInModel() {
        model.addModelListener(onModelChange);
    })();

    /**
     * Notify the model that a view change occurred
     * 
     * @param {EventType} eventType - type of the event
     * @param {T} value - changed value
     * @returns {void}
     * 
     */
    function onViewChange(eventType, value) {
        if (eventType === EventType.CONTENT) {
            if (model.getNavigationPoint().getContent() === value) return;
            model.getNavigationPoint().setContent(value);
        } else if (eventType === EventType.NAVIGATION) {
            if (model.getNavigationPoint().getId() === value) return;
            setNavigationPointByCardId(value);
        }
    }

    /**
     * Helper function to set the navigation card in the model with the specified id
     * @param {String} id 
     * @return {void}
     */
    function setNavigationPointByCardId(id) {
        for (let card of model.getCards()) {
            if (card.getId() === id) {
                model.setNavigationPoint(card);
            }
        }
    }

    return {
        addModelChangeListener,
        onViewChange,
        onModelChange
    }
}