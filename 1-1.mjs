import { day1Sample1, day1Data } from "./data.mjs";

const getCalibrationValue = (str) => {
  const nums = str.match(/\d/g);
  const calibrationVal = nums[0] + nums[nums.length - 1];
    console.debug(nums + " = " + calibrationVal)
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
// 53651
