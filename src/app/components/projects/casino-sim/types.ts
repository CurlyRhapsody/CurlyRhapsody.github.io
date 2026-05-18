export enum Suit {
    Clubs = '♣',
    Diamonds = '♦',
    Hearts = '♥',
    Spades = '♠'
}

export enum Rank {
    Two = 2, Three = 3, Four = 4, Five = 5,
    Six = 6, Seven = 7, Eight = 8, Nine = 9,
    Ten = 10, Jack = 11, Queen = 12, King = 13,
    Ace = 14
}

export type Card = {
    suit: Suit;
    rank: Rank;
}

export enum CardHandRank {
    HighCard = "highCard", // No special pattern
    OnePair = "onePair",
    TwoPairs = "twoPairs",
    ThreeOfAKind = "threeOfAKind",
    Straight = "straight",
    Flush = "flush",
    FullHouse = "fullHouse",
    FourOfAKind = "fourOfAKind",
    StraightFlush = "straightFlush",
    RoyalFlush = "royalFlush" // 10-J-Q-K-A  Straight Flush
}

export enum DiceType {
    FOUR = 4,
    SIX = 6,
    EIGHT = 8,
    TEN = 10,
    TWLEVE = 12,
    TWENTY = 20
}

export type Dice = {
    type: DiceType,
    value: number,
}