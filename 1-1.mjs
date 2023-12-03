import { day1Sample1, day1Sample2, day1Data } from "./data.mjs";

const number = new RegExp(
  /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/
);
const numberInvert = new RegExp(
  /(\d)|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/
);

const replaceLettersWithDigits = (calibrationVal) => {
  return calibrationVal
    .replace(/one/g, "1")
    .replace(/two/g, "2")
    .replace(/three/g, "3")
    .replace(/four/g, "4")
    .replace(/five/g, "5")
    .replace(/six/g, "6")
    .replace(/seven/g, "7")
    .replace(/eight/g, "8")
    .replace(/nine/g, "9");
};

const findFirstNumber = (str) => {
  return str.match(number)[0];
};

const findLastNumber = (str) => {
  // reverse string, find reverse match, flip it back to normal
  return str
    .split("")
    .reverse()
    .join("")
    .match(numberInvert)[0]
    .split("")
    .reverse()
    .join("");
};
const getCalibrationValue = (str) => {
  const val1 = findFirstNumber(str);
  const val2 = findLastNumber(str);
  const calibrationVal = replaceLettersWithDigits(val1 + val2);
  // console.debug([val1,val2] + " = " + calibrationVal);
  return calibrationVal;
};

console.log(
  day1Data
    .split("\n")
    .reduce(
      (sum, currentValue) => sum + parseInt(getCalibrationValue(currentValue)),
      0
    )
);
