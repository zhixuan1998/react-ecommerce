function compareObjectValue(a, b) {
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

export { compareObjectValue };
