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
    HighCard, // No special pattern
    OnePair,
    TwoPairs,
    ThreeOfAKind,
    Straight,
    Flush,
    FullHouse,
    FourOfAKind,
    StraightFlush,
    RoyalFlush // 10-J-Q-K-A  Straight Flush
}