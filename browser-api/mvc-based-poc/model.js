import { EventType } from "./EventType.js";
import { Observable } from "./Observable.js";

export { Model, Card }

/**
 * Model containing the application data
 * 
 * @typedef {Object} model
 * @param {card} startingPoint 
 * @param {[card]} cardsParam 
 */
const Model = (startingPoint, cardsParam) => {
    let navigationPoint = Observable(startingPoint)
    const cards = cardsParam;
    const modelListeners = [];

    return {
        addModelListener: callback => {
            modelListeners.push(callback);
            cards.forEach(card => card.addCardListener(callback));
        },
        getNavigationPoint: () => navigationPoint.getValue(),
        setNavigationPoint: newValue => {
            if(navigationPoint.getValue() === newValue) return;
            navigationPoint.setValue(newValue);
            modelListeners.forEach(callback => callback(EventType.NAVIGATION, navigationPoint.getValue()));
        },
        getCards: () => cards
    }
}

/**
 * Card containing the content
 * @typedef {Object} card
 * @param {string} _id 
 */
const Card = (_id) => {
    let id      = _id;
    let content = Observable('');
    const cardListeners = [];

    return {
        addCardListener: callback => {
            cardListeners.push(callback);
        },
        getId: () => id,
        getContent: () => content.getValue(),
        setContent: newContent => {
            if (content === newContent) return;
            content = Observable(newContent);
            cardListeners.forEach(callback => callback(EventType.CONTENT, newContent));
        }
    }
}
