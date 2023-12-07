import { day3Sample1, day3Sample2, day3Data } from "./data.mjs";

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
}

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

console.log("sum of all part numbers: " + sum)