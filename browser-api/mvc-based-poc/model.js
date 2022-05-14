import { Observable } from "./Observable.js";

export { Model, Card }

const Model = (startingPoint, cardsParam) => {
    let navigationPoint = Observable(startingPoint)
    const cards = cardsParam;

    return {
        getNavigationPoint: () => navigationPoint,
        setNavigationPoint: newValue => {
            if(navigationPoint.getValue() === newValue) return;
            navigationPoint.setValue(newValue);
        },
        getCards: () => cards
    }


}

const Card = (_id) => {
    let id      = _id;
    let content = Observable('');

    return {
        getId: () => id,
        getContent: () => content,
    }
}
