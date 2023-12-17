import { day7Sample1, day7data } from "./data";

const lines = day7data.split("\n");
const strength: string[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
];

enum TYPE {
    HIGH_CARD,
    PAIR,
    TWO_PAIR,
    THREE_OF_A_KIND,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    FIVE_OF_A_KIND,
}

interface HAND {
    cards: string;
    bid: number;
    type: TYPE;
}

function getHandType(cards: string): TYPE {
    let map = new Map<string, number>();
    cards.split("").forEach((card) => {
        if (!map.has(card)) {
            map.set(card, 0);
        }
        let count = map.get(card);
        map.set(card, ++count);
    });
    let type = TYPE.HIGH_CARD;
    if (map.size === 1) {
        type = TYPE.FIVE_OF_A_KIND;
    } else if (map.size === 2 && Array.from(map.values()).includes(4)) {
        type = TYPE.FOUR_OF_A_KIND;
    } else if (map.size === 2 && Array.from(map.values()).includes(3)) {
        type = TYPE.FULL_HOUSE;
    } else if (map.size === 3 && Array.from(map.values()).includes(3)) {
        type = TYPE.THREE_OF_A_KIND;
    } else if (map.size === 3 && Array.from(map.values()).includes(2)) {
        type = TYPE.TWO_PAIR;
    } else if (map.size === 4) {
        type = TYPE.PAIR;
    }

    return type;
}

const byCards = (a: HAND, b: HAND): number => {
    let arr1: string[] = a.cards.split("");
    let arr2: string[] = b.cards.split("");
    for (let i = 0; i < arr1.length; i++) {
        const arr1Strength = strength.indexOf(arr1[i]);
        const arr2Strength = strength.indexOf(arr2[i]);
        if (arr1Strength != arr2Strength) {
            return arr1Strength - arr2Strength;
        }
    }
    return 0;
};

const byType = (a: HAND, b: HAND): number => {
    return a.type - b.type;
};

let hands: HAND[] = [];
lines.forEach((line) => {
    const handAndBid = line.split(/\s+/);
    let hand: HAND = {
        cards: handAndBid[0],
        bid: parseInt(handAndBid[1]),
        type: getHandType(handAndBid[0]),
    };
    hands.push(hand);
});

hands.sort(byCards).sort(byType);
let winnings: number = 0;
for (let i = 0; i < hands.length; i++) {
    winnings += (i + 1) * hands[i].bid;
}
console.log(winnings);
