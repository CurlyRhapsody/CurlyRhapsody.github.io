import { Card, CardHandRank, Dice, DiceType, Rank, SicBoCombs, Suit } from "./types";

/* ----- Poker ----- */
const SUIT_ORDER: Record<Suit, number> = {
    [Suit.Clubs]: 1,
    [Suit.Diamonds]: 2,
    [Suit.Hearts]: 3,
    [Suit.Spades]: 4,
};

export function sortCards(a: Card, b: Card): number {
    if (a.rank !== b.rank) { return a.rank - b.rank; }
    return SUIT_ORDER[a.suit] - SUIT_ORDER[b.suit];
}

export function evaluateHand(hand: Card[]): CardHandRank {
    const freqs: { [rank: number]: number } = {};
    for (const card of hand) freqs[card.rank] = (freqs[card.rank] || 0) + 1;
    // Sort for easier determination later
    const frequencies = Object.values(freqs).sort((a, b) => b - a);
    const isFlush = hand.every(card => card.suit === hand[0].suit);

    let isStraight = hand.every((card, i) => (i === 0 || card.rank === hand[i-1].rank + 1));

    // Special case: A-2-3-4-5
    const isWheelStraight = hand[0].rank === Rank.Two && hand[1].rank === Rank.Three
                            && hand[2].rank === Rank.Four && hand[3].rank === Rank.Five
                            && hand[4].rank === Rank.Ace;
    // Royal Flush precondition: 10-J-Q-K-A (Add striaght check for short-circuit)
    const isRoyalStraight = isStraight && hand[0].rank === Rank.Ten && hand[1].rank === Rank.Jack
                            && hand[2].rank === Rank.Queen && hand[3].rank === Rank.King
                            && hand[4].rank === Rank.Ace;

    if (isWheelStraight) isStraight = true;

    if (isRoyalStraight && isFlush) return CardHandRank.RoyalFlush;
    if (isStraight && isFlush) return CardHandRank.StraightFlush;
    if (frequencies[0] === 4) return CardHandRank.FourOfAKind;
    if (frequencies[0] === 3 && frequencies[1] === 2) return CardHandRank.FullHouse;
    if (isFlush) return CardHandRank.Flush;
    if (isStraight) return CardHandRank.Straight;
    if (frequencies[0] === 3) return CardHandRank.ThreeOfAKind;
    if (frequencies[0] === 2 && frequencies[1] === 2) return CardHandRank.TwoPairs;
    if (frequencies[0] === 2) return CardHandRank.OnePair;
    return CardHandRank.HighCard;
}

/* ----- Dice roll ----- */
const DICE_CYCLE_ORDER: DiceType[] = [
    DiceType.FOUR, DiceType.SIX, DiceType.EIGHT, DiceType.TEN, DiceType.TWLEVE, DiceType.TWENTY
];

export function changeDiceTypeOfDice(dice: Dice[], index: number): Dice[] {
    const numDice = dice.length;
    if (index < 0 || index >= numDice) return dice;

    const newDice = [...dice];
    const currentDice = newDice[index];

    const currIdx = DICE_CYCLE_ORDER.indexOf(currentDice.type);
    const nextDice = (currIdx + 1) % DICE_CYCLE_ORDER.length;

    newDice[index] = { type: DICE_CYCLE_ORDER[nextDice], value: 1 };

    return newDice;
}

/* ----- Sic Bo ----- */
export function evaluateSicBo(dice: number[]): SicBoCombs | undefined {

    if (dice.length !== 3) return undefined;

    const sum = dice[0] + dice[1] + dice[2];

    // Sort dice combination in ascending order
    const sorted = dice.sort((a, b) => a - b);
    const encoded = sorted.join("-");

    const freqs: { [rank: number]: number } = {};
    for (const die of dice) {
        freqs[die] = (freqs[die] || 0) + 1;
    }

    let isTriple = false; let hasDouble = false;
    let triple = undefined; let double = undefined;

    Object.entries(freqs).forEach(([value, frequency]) => {
        if (frequency === 3) {
            isTriple = true;
            triple = parseInt(value);
        }
        if (frequency === 2) {
            hasDouble = true;
            double = parseInt(value);
        }
    })

    return { sum, encoded, isTriple, triple, hasDouble, double, freqs }
}

/* ----- Mark Six ----- */
export function determineMarkSixColor(num: number) {
    const idx = Math.floor((num + Math.floor(num / 10) % 6) / 2);
}