import { Model, Card } from './model.js';

export { Controller }

const Controller = model => {
    
    function onViewChange(eventType, value) {
        console.log(eventType, value);
    }

    return {
        onViewChange
    }
}