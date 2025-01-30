function compare(a, b) {
    const a_keys = Object.keys(a);
    const b_keys = Object.keys(b);

    if (a_keys.length !== b_keys.length) {
        return false;
    }

    for (let key of a_keys) {
        if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

function toArray({ obj = {}, keyName = 'key', valueName }) {
    const DEFAULT_VALUE_NAME = 'value';

    if (!isObject(obj) || Object.keys(obj).length === 0) return [];

    const arr = Object.keys(obj).map((key) => {
        let newObj = {
            [keyName]: key
        };

        if (!isObject(obj[key])) {
            return (newObj[valueName ?? DEFAULT_VALUE_NAME] = obj[key]);
        }

        if (valueName) {
            newObj[valueName] = obj[key];
        } else {
            newObj = { ...newObj, ...obj[key] };
        }

        return newObj;
    });

    return arr;
}

function isObject(obj) {
    return !!obj && typeof obj === 'object' && obj.contructor === Object;
}

export { compare, toArray, isObject };
