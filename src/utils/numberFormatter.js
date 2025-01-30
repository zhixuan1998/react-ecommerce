function convertNumberToRelativeNumber(number) {
    number = isNaN(number) ? 0 : number;
    return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
}

export { convertNumberToRelativeNumber };
