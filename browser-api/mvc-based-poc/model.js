import { Observable } from "./Observable.js";

export { Model, Card }

const Model = cardsParam => {
    let navigationPoint = "";
    const cards = cardsParam;

    return {
        getNavigationPoint: () => navigationPoint,
        setNavigationPoint: newValue => {
            if(navigationPoint === newValue) return;
            navigationPoint = newValue;
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
