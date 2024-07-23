export const intersectProps = function(props, regularProps) {
    const keys = Object.keys(regularProps);

    let obj = {};

    for (let key of keys) {
        if (key in props) {
            obj[key] = props[key];
        }
    }

    return obj;
}

export const omitProps = function(props, omitKeys = []) {
    if (omitKeys.length === 0) return props;

    const obj = { ...props };

    for(let key of omitKeys) {
        delete obj[key];
    }

    return obj;
}