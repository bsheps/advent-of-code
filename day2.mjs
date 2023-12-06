import { day2Sample1, day2Data, day2Sample1_1 } from "./data.mjs";

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const lines = day2Data.split("\n");

function isRevealImpossible(revealedCubes) {
  // console.debug(revealedCubes);
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
  // console.debug(game[0])
  if (!isGameImpossible(game[1].trim())) {
    sum += index + 1;
  }
}

console.log("puzzle 1: " + sum);

const getEmptyBag = () => {
  return { red: 0, green: 0, blue: 0 };
};

const calcPowerOfCubes = (b) => {
  return b.red * b.green * b.blue;
};

function updateOptimizedBag(optimizedBag, sample) {
  for (let i = 0; i < sample.length; i += 2) {
    const num = parseInt(sample[i]);
    const color = sample[i + 1];
    if (num > optimizedBag[color]) {
      optimizedBag[color] = num;
    }
  }
}

function getOptimizedBag(samples) {
  const optimizedBag = getEmptyBag();
  samples.forEach((sample) => {
    sample = sample.trim().replace(/,/g, "").split(" ");
    updateOptimizedBag(optimizedBag, sample);
    // console.debug(optimizedBag)
  });
  return optimizedBag;
}

sum = 0;
lines.forEach((line) => {
  const game = line.split(":")[1].trim();
  const samples = game.split(";");
  const optimizedBag = getOptimizedBag(samples);
  // console.debug(optimizedBag);
  sum += calcPowerOfCubes(optimizedBag);
});
console.log("puzzle 2: " + sum)
