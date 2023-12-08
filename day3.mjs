import { day3Sample1, day3Sample2, day3Sample3, day3Data } from "./data.mjs";

const symbols = new Set(["@", "&", "*", "$", "-", "#", "=", "%", "+", "/"]);
const symbol = (element) => symbols.has(element);

const rows = day3Data.split("\n");

const isNumber = (ch) => {
  if (ch) return ch.match(/\d/);
  return false;
};

function hasSymbol(ch) {
  if (ch) return symbols.has(ch);
  return false;
}

function hasSymbolAbove(currentRowIndex, start, end) {
  if (currentRowIndex === 0) return false;
  const rowAbove = rows[currentRowIndex - 1];
  const chars = rowAbove.split("").slice(getStartIndex(start), end + 1);
  return chars.some(symbol);
}

const getStartIndex = (start) => {
  return start < 0 ? 0 : start;
};

function hasSymbolBelow(currentRowIndex, start, end) {
  if (currentRowIndex === rows.length - 1) return false;
  const rowBelow = rows[currentRowIndex + 1];
  const chars = rowBelow.split("").slice(getStartIndex(start), end + 1);
  //   console.debug(chars)
  return chars.some(symbol);
}

let sum = 0;
for (let i = 0; i < rows.length; i++) {
  const chars = rows[i].split("");
  for (let j = 0; j < chars.length; j++) {
    if (isNumber(chars[j])) {
      let number = chars[j];
      let k = j + 1;
      while (isNumber(chars[k])) {
        number += chars[k++];
      }
      if (
        hasSymbol(chars[j - 1]) ||
        hasSymbol(chars[k]) ||
        hasSymbolAbove(i, j - 1, k) ||
        hasSymbolBelow(i, j - 1, k)
      ) {
        // console.debug(number);
        sum += parseInt(number);
      }
      j = k - 1;
    }
  }
}

console.log("sum of all part numbers: " + sum);

function getLeftSide(rowIndex, colIndex) {
  const row = rows[rowIndex].split("");
  if (row[colIndex - 1]?.match(/\d/)) return 1;
  return 0;
}

function getRightSide(rowIndex, colIndex) {
  const row = rows[rowIndex].split("");
  if (row[colIndex + 1]?.match(/\d/)) return 1;
  return 0;
}

function getAbove(rowIndex, colIndex) {
  if (rowIndex === 0) return 0; // we're in top row, nothing above
  const row = rows[rowIndex - 1].split("");
  const left = row[colIndex - 1];
  const middle = row[colIndex];
  const right = row[colIndex + 1];
  if (middle.match(/\d/)) return 1;
  else if (left?.match(/\d/) && right?.match(/\d/)) return 2;
  else if (left?.match(/\d/) || right?.match(/\d/)) return 1;
  return 0;
}

function getBelow(rowIndex, colIndex) {
  if (rowIndex === rows.length - 1) return 0; // we're in bottom row, nothing below
  const row = rows[rowIndex + 1].split("");
  const left = row[colIndex - 1];
  const middle = row[colIndex];
  const right = row[colIndex + 1];
  if (middle.match(/\d/)) return 1;
  else if (left?.match(/\d/) && right?.match(/\d/)) return 2;
  else if (left?.match(/\d/) || right?.match(/\d/)) return 1;
  return 0;
}

function isGear(rowIndex, colIndex) {
  const adjacentPartNumbers =
    getLeftSide(rowIndex, colIndex) +
    getRightSide(rowIndex, colIndex) +
    getAbove(rowIndex, colIndex) +
    getBelow(rowIndex, colIndex);
  return adjacentPartNumbers === 2;
}

function getRightSideNum(rowIndex, colIndex) {
  const row = rows[rowIndex].split("");
  let i = colIndex + 1;
  let partNum = "";
  while (row[i]?.match(/\d/)) {
    partNum += row[i++];
  }
  return parseInt(partNum);
}

function getLeftSideNum(rowIndex, colIndex) {
  const row = rows[rowIndex].split("");
  let i = colIndex - 1;
  let partNum = "";
  while (row[i]?.match(/\d/)) {
    partNum = row[i--] + partNum;
  }
  return parseInt(partNum);
}

function getSingleNum(rowIndex, colIndex) {
  const row = rows[rowIndex].split("");
  let firstDigit = -1;
  if (row[colIndex - 1]?.match(/\d/)) {
    while (row[colIndex - 1]?.match(/\d/)) {
      firstDigit = colIndex - 1;
      colIndex--;
    }
  } else if (row[colIndex]?.match(/\d/)) {
    firstDigit = colIndex;
  } else {
    firstDigit = colIndex + 1;
  }
  let gearNum = "";
  while (row[firstDigit]?.match(/\d/)) {
    gearNum += row[firstDigit++];
  }
  return parseInt(gearNum);
}

function getGearRatio(rowIndex, colIndex) {
  let gearRatio = 1;
  if (getAbove(rowIndex, colIndex) == 2) {
    return (
      getLeftSideNum(rowIndex - 1, colIndex) *
      getRightSideNum(rowIndex - 1, colIndex)
    );
  }
  if (getBelow(rowIndex, colIndex) == 2) {
    return (
      getLeftSideNum(rowIndex + 1, colIndex) *
      getRightSideNum(rowIndex + 1, colIndex)
    );
  }
  if (getRightSide(rowIndex, colIndex) == 1) {
    gearRatio *= getRightSideNum(rowIndex, colIndex);
  }
  if (getLeftSide(rowIndex, colIndex) == 1) {
    gearRatio *= getLeftSideNum(rowIndex, colIndex);
  }
  if (getAbove(rowIndex, colIndex) == 1) {
    gearRatio *= getSingleNum(rowIndex - 1, colIndex);
  }
  if (getBelow(rowIndex, colIndex) == 1) {
    gearRatio *= getSingleNum(rowIndex + 1, colIndex);
  }
  return gearRatio;
}

let sumOfGearRatios = 0;
for (let i = 0; i < rows.length; i++) {
  const chars = rows[i].split("");
  for (let j = 0; j < chars.length; j++) {
    if (chars[j] === "*" && isGear(i, j)) {
      //   console.debug("gear found");
      const gearRatio = getGearRatio(i, j);
      //   console.debug("gear ratio: " + gearRatio)
      sumOfGearRatios += gearRatio;
    }
  }
}
console.log("sum of gear ratios: " + sumOfGearRatios);
