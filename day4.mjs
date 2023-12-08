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
