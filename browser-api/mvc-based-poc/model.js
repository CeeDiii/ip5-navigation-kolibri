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

const Observable = value => {
    const listeners = [];
    return {
        onBlur: callback => {
            listeners.push(callback);
            callback(value, value);
        },
        getValue: () => value,
        setValue: newValue => {
            if(value === newValue) return;
            value = newValue;
            listeners.forEach(callback => callback(value));
        },
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
