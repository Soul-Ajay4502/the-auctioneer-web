function capitalizeCamelCase(str) {
    return str
        ?.replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Adds space before uppercase letters
        ?.replace(/^./, (match) => match?.toUpperCase());  // Capitalizes the first letter
}

export default capitalizeCamelCase;

