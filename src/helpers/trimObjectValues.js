function trimObjectValues(obj) {
    // Iterate over all keys in the object
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            // Check if the value is a string
            if (typeof value === 'string') {
                obj[key] = value.trim(); // Remove leading and trailing spaces
            }
        }
    }
    return obj;
}
export default trimObjectValues;
