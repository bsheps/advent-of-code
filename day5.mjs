import { day5Sample1, day5Data } from "./data.mjs";

const almanac = [];
const keys = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
];

const lines = day5Data.split("\n");
// console.log(lines)
let i = 0;
const seedsSection = lines[i].split(": ");
const seedNums = seedsSection[1].split(" ");

/**
 * For puzzle part 1
 */
// seedNums.forEach((seedNum) => {
//     let data = {
//         seed: parseInt(seedNum),
//     };
//     almanac.push(data);
// });

/**
 * For puzzle part 2
 */
let counter = 0;
for (let index = 0; index < seedNums.length; index += 2) {
    let startVal = seedNums[index];
    for (let modifier = 0; modifier < seedNums[index + 1]; modifier++) {
        let data = {
            seed: parseInt(startVal) + modifier,
        };
        almanac.push(data);
    }
}
console.debug(almanac);
function mapToObject(map) {
    return {
        destination: parseInt(map[0]),
        source: parseInt(map[1]),
        range: parseInt(map[2]),
        diff: parseInt(map[0]) - parseInt(map[1]),
    };
}

function isMappedEntry(entry, sourceName, arr) {
    const source = entry[sourceName];
    for (let i = 0; i < arr.length; i++) {
        let o = arr[i];
        if (source >= o.source && source <= o.source + o.range) {
            return true;
        }
    }
    return false;
}

function mapSoilEntry(entry, sourceName, arr, destinationName) {
    const source = entry[sourceName];
    for (let i = 0; i < arr.length; i++) {
        let o = arr[i];
        if (source >= o.source && source <= o.source + o.range) {
            entry[destinationName] = source + o.diff;
            return;
        }
    }
}

function mapData(i) {
    const arr = [];
    for (; i < lines.length && lines[i].length != ""; i++) {
        arr.push(mapToObject(lines[i].split(" ")));
    }
    return arr;
}

function populateAlmanac(almanac, sourceName, destinationName, mapData) {
    // console.debug(mapData)
    almanac.forEach((entry) => {
        if (isMappedEntry(entry, sourceName, mapData)) {
            mapSoilEntry(entry, sourceName, mapData, destinationName);
        } else {
            entry[destinationName] = entry[sourceName];
        }
    });
}

//map seed to soil
for (let i = 3, keyIndex = 1; keyIndex < keys.length; keyIndex++) {
    populateAlmanac(almanac, keys[keyIndex - 1], keys[keyIndex], mapData(i));
    while (i < lines.length && lines[i] != "") i++;
    i += 2;
    // console.debug(almanac);
}

function getLowestLocationNumber(almanac) {
    let min = Number.POSITIVE_INFINITY;
    almanac.forEach((seedSpecs) => {
        min = Math.min(min, seedSpecs.location);
    });
    return min;
}
console.log(almanac);
console.log(getLowestLocationNumber(almanac));
