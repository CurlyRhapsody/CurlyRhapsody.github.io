const currencyRegex = /^\d*\.?\d{0,2}$/;

export function checkCurrencyFormat(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setField: (newTotal?: string) => void) {
    const value = event.target.value;

    if (value === undefined) setField(undefined);

    if (currencyRegex.test(value)) {
        setField(value);
    }
}

const participantRegex = /^[0-9]+$/;

export function checkParticipantFormat(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): string | undefined {
    const value: string = event?.target?.value;

    if (value === undefined) return undefined;

    if (participantRegex.test(value)) {
        return value;
    }
    return undefined;
}