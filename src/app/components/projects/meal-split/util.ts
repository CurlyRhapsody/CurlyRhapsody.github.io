const currencyRegex = /^\d*\.?\d{0,2}$/;

export function checkCurrencyFormat(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setField: (newTotal?: string) => void) {
    const value = event.target.value;

    if (value === undefined) setField(undefined);

    if (currencyRegex.test(value)) {
        setField(value);
    }
}