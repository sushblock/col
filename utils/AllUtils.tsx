function getPriceWithCurrency(currency: string, price: number) {
    // Format the price to currency using the locale, style, and currency.
    let symbol = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });

    return symbol.format(price);

}

export {getPriceWithCurrency}
