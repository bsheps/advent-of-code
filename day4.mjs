import { day4Sample1, day4Data } from "./data.mjs";

const cards = day4Data.split("\n");

let total = 0;
cards.forEach((card) => {
  card = card.replace(/[ ]+/g, " "); // remove excess whitespace
  const game = card.split(": ");
  const board = game[1].trim().split(" | ");
  const winningNumbers = board[0].split(" ");
  const cardNumbers = board[1].split(" ");
  const matchingNumbers = winningNumbers.filter((n) => cardNumbers.includes(n)).length;
  if (matchingNumbers > 0) {
    const points = Math.pow(2, matchingNumbers - 1);
    total += points;
  }
});
console.log("total points: " + total);

const originalCards = day4Data.split("\n");
const cardCount = [];
// fill up starting value
for (let i = 0; i < originalCards.length; i++) {
    cardCount[i] = 1;
}

for (let i = 0; i < originalCards.length; i++) {
    const card = originalCards[i].replace(/[ ]+/g, " "); // remove excess whitespace
    const game = card.split(": ");
    const board = game[1].trim().split(" | ");
    const winningNumbers = board[0].split(" ");
    const cardNumbers = board[1].split(" ");
    const matchingNumbers = winningNumbers.filter((n) =>
        cardNumbers.includes(n)
    ).length;
    // console.debug(matchingNumbers)
    if (matchingNumbers > 0) {
        const numOfThisCard = cardCount[i];
        for(let j = i+1; j <= i + matchingNumbers && j < cardCount.length; j++){
            cardCount[j] = cardCount[j] + numOfThisCard;
        }
    }
    // console.debug(cardCount)
}
let totalScratchoff = 0;
for(let i =0; i < originalCards.length; i++){
    totalScratchoff += cardCount[i];
}
console.log('total scratchcards: ' + totalScratchoff)
