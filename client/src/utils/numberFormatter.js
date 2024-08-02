function convertNumberToRelativeNumber(number) {
    number = isNaN(number) ? number : 0;
    return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
}

export { convertNumberToRelativeNumber };
