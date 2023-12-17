import { error } from "console";
import { day7Sample1, day7data } from "./data";

const lines = day7data.split("\n");
const strength: string[] = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
];

enum eType {
    HIGH_CARD,
    PAIR,
    TWO_PAIR,
    THREE_OF_A_KIND,
    FULL_HOUSE,
    FOUR_OF_A_KIND,
    FIVE_OF_A_KIND,
}

interface iHand {
    cards: string;
    bid: number;
    type: eType;
}
function handleJokers(jokers: number, type: eType): eType {
    // console.debug("handle jokers: " + jokers + ", " + eType[type]);
    if (jokers === 0) return type;
    if (type === eType.HIGH_CARD) {
        return handleJokers(--jokers, eType.PAIR);
    } else if (type === eType.PAIR) {
        return handleJokers(--jokers, eType.THREE_OF_A_KIND);
    } else if (type === eType.TWO_PAIR) {
        return handleJokers(--jokers, eType.FULL_HOUSE);
    } else if (type === eType.THREE_OF_A_KIND) {
        return handleJokers(--jokers, eType.FOUR_OF_A_KIND);
    } else if (type === eType.FOUR_OF_A_KIND) {
        return eType.FIVE_OF_A_KIND;
    }
    throw error("handle jokers end of method error");
}

function getHandType(cards: string): eType {
    let map = new Map<string, number>();
    let jokers = 0;
    const cardArray = cards.split("");
    // console.debug(cardArray);
    for (let i = 0; i < cardArray.length; i++) {
        const card = cardArray[i];
        if (card === "J") {
            jokers++;
            continue;
        }
        if (!map.has(card)) {
            map.set(card, 0);
        }
        let count = map.get(card);
        map.set(card, ++count);
    }
    let type = eType.HIGH_CARD;
    if (jokers > 0) {
        type = getTypeWithJokers(map, jokers);
    } else {
        type = getTypeNoJokers(map);
    }
    return type;
}

const byCards = (a: iHand, b: iHand): number => {
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

const byType = (a: iHand, b: iHand): number => {
    return a.type - b.type;
};

let hands: iHand[] = [];
lines.forEach((line) => {
    const handAndBid = line.split(/\s+/);
    let hand: iHand = {
        cards: handAndBid[0],
        bid: parseInt(handAndBid[1]),
        type: getHandType(handAndBid[0]),
    };
    hands.push(hand);
});

function getTypeNoJokers(map: Map<string, number>): eType {
    let type: eType = eType.HIGH_CARD;
    if (map.size === 1) {
        type = eType.FIVE_OF_A_KIND;
    } else if (map.size === 2 && Array.from(map.values()).includes(4)) {
        type = eType.FOUR_OF_A_KIND;
    } else if (map.size === 2 && Array.from(map.values()).includes(3)) {
        type = eType.FULL_HOUSE;
    } else if (map.size === 3 && Array.from(map.values()).includes(3)) {
        type = eType.THREE_OF_A_KIND;
    } else if (map.size === 3 && Array.from(map.values()).includes(2)) {
        type = eType.TWO_PAIR;
    } else if (map.size === 4) {
        type = eType.PAIR;
    }
    return type;
}

function getTypeWithJokers(map: Map<string, number>, jokers: number): eType {
    let type: eType = eType.HIGH_CARD;
    if (map.size === 1) {
        type = eType.FIVE_OF_A_KIND;
        jokers = 0;
    } else if (map.size === 2 && Array.from(map.values()).includes(3)) {
        type = handleJokers(jokers, eType.THREE_OF_A_KIND);
    } else if (
        map.size === 2 &&
        Array.from(map.values())[0] === 2 &&
        Array.from(map.values())[1] === 2
    ) {
        type = handleJokers(jokers, eType.TWO_PAIR);
    } else if (Array.from(map.values()).includes(2)) {
        type = handleJokers(jokers, eType.PAIR);
    } else {
        type = handleJokers(jokers, eType.HIGH_CARD);
    }
    return type;
}

hands.sort(byCards).sort(byType);
let winnings: number = 0;
for (let i = 0; i < hands.length; i++) {
    winnings += (i + 1) * hands[i].bid;
}

console.log(winnings);
