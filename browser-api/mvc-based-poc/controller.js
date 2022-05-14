import { EventType } from './EventType.js';
import { Model, Card } from './model.js';

export { Controller }

const Controller = model => {
    
    function onViewChange(eventType, value) {
        if (eventType === EventType.CONTENT) {
            if (model.getNavigationPoint().getValue().getContent() === value) return;
            console.log("model value change to " + value)
            model.getNavigationPoint().getValue().getContent().setValue(value);
        } else if (eventType === EventType.NAVIGATION) {
            if (model.getNavigationPoint().getValue().getId() === value) return;
            for (let card of model.getCards()) {
                if (card.getId() === value) {
                    console.log("navigation point changed to " + value)
                    model.setNavigationPoint(card);
                }
            }
        }
    }

    return {
        onViewChange
    }
}