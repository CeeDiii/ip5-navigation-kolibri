import { EventType } from './EventType.js';

export { Controller }

const Controller = model => {
    const modelListeners = [];

    function addModelChangeListener(callback) {
        modelListeners.push(callback);
    }
    
    function onViewChange(eventType, value) {
        if (eventType === EventType.CONTENT) {
            if (model.getNavigationPoint().getContent() === value) return;
            console.log("view changed model content to " + value);
            model.getNavigationPoint().setContent(value);
        } else if (eventType === EventType.NAVIGATION) {
            if (model.getNavigationPoint().getId() === value) return;
            for (let card of model.getCards()) {
                if (card.getId() === value) {
                    console.log("view changed model navigation point to " + value)
                    model.setNavigationPoint(card);
                }
            }
        }
    }

    function onModelChange(eventType, value) {
        modelListeners.forEach(callback => {
            callback(eventType, value);
        });
    }

    (function registerInModel() {
        model.addModelListener(onModelChange);
    })();

    return {
        addModelChangeListener,
        onViewChange,
        onModelChange
    }
}