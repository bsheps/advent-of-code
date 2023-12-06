import { day2Sample1, day2Data, day2Sample1_1 } from "./data.mjs";

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const lines = day2Data.split("\n");

function isRevealImpossible(revealedCubes) {
  console.debug(revealedCubes);
  for (let i = 0; i < revealedCubes.length; i += 2) {
    const numCubes = parseInt(revealedCubes[i]);
    const color = revealedCubes[i + 1];
    //   console.debug(color + " " + numCubes)
    if (numCubes > bag[color]) return true;
  }
  return false;
}

function isGameImpossible(game) {
  const sets = game.split(";");
  for (let i = 0; i < sets.length; i++) {
    const revealedCubes = sets[i].trim().replace(/,/g, "").split(" ");
    if (isRevealImpossible(revealedCubes)) return true;
  }
  return false;
}

let sum = 0;
for (const [index, val] of lines.entries()) {
  const game = val.split(":");
  console.debug(game[0])
  if (!isGameImpossible(game[1].trim())) {
    sum += index + 1;
  }
}

console.log(sum);
