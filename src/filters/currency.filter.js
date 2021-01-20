export default function currencyFilter(value) {
    var moneyFormatter  = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
    });
    return moneyFormatter.format(value);
}