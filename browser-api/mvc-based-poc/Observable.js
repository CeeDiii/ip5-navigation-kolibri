//@ts-check
export { Observable }

const Observable = value => {
    const listeners = [];
    return {
        onChange: callback => {
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