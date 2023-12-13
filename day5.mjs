import { day5Sample1, day5Data } from "./data.mjs";

let almanac = [];
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

seedNums.forEach((seedNum) => {
    let data = {
        seed: parseInt(seedNum),
    };
    almanac.push(data);
});

// console.debug(almanac);
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
// console.log(almanac);
console.log(getLowestLocationNumber(almanac));

//----------- part 2 -----------------
//------------------------------------
class Mapping {
    dest;
    src;
    range;

    constructor(dest, src, range) {
        this.dest = parseInt(dest);
        this.src = parseInt(src);
        this.range = parseInt(range);
    }
    get start() {
        return this.src;
    }

    get end() {
        return this.src + this.range;
    }
}

class Range {
    start;
    end;
    constructor(start, end) {
        this.start = parseInt(start);
        this.end = parseInt(end);
    }

    get start() {
        return this.start;
    }
    get end() {
        return this.end;
    }
    get isPositiveRange() {
        return this.end > this.start;
    }
}

let seeds = [];
let mappings = {};

for (let index = 0; index < seedNums.length; index += 2) {
    let seedNum = seedNums[index];
    let seedRange = seedNums[index + 1];
    let data = {
        seed: parseInt(seedNum),
        seedRange: parseInt(seedRange),
    };
    seeds.push(data);
}
i = 3;
let keyIndex = 1;
while (i < lines.length) {
    let mappingKey = keys[keyIndex++];
    mappings[mappingKey] = [];
    while (i < lines.length && lines[i] != "") {
        let data = lines[i].split(" ");
        let mapping = new Mapping(data[0], data[1], data[2]);
        mappings[mappingKey].push(mapping);
        i++;
    }
    i += 2;
}

/**
 * heavily inspired by J Paulson
 *
 * @param {*} ranges: Array<Range>
 * @param {*} mappings: Array<Mapping>
 */
function findIntervals(ranges, mappings) {
    let intersectedRanges = [];
    mappings.forEach((map) => {
        // console.log(map);
        let nonIntersectedRanges = [];
        while (ranges?.length > 0) {
            // console.log(ranges)
            const range = ranges.pop();

            // this is the left side of our range that does not intersect with the mapping
            const intervalLeft = new Range(
                range.start,
                Math.min(range.end, map.start)
            );

            // this is the intersection where our range intersects with the mapping
            const intersection = new Range(
                Math.max(range.start, map.start),
                Math.min(map.end, range.end)
            );

            // this is the right side of our range that does not intersect with the mapping
            const intervalRight = new Range(
                Math.max(map.end, range.start),
                range.end
            );

            if (intervalLeft.isPositiveRange) {
                nonIntersectedRanges.push(intervalLeft);
            }
            if (intersection.isPositiveRange) {
                intersectedRanges.push(
                    new Range(
                        intersection.start - map.src + map.dest,
                        intersection.end - map.src + map.dest
                    )
                );
            }
            if (intervalRight.isPositiveRange) {
                nonIntersectedRanges.push(intervalRight);
            }
        }
        ranges = ranges.concat(nonIntersectedRanges);
    });
    return intersectedRanges.concat(ranges);
}

let lowest = Infinity;
for (const { seed, seedRange } of seeds) {
    /* Build the pair with inclusive start and exclusive end values
     *   [a,b) = b-a
     *   [a,b) + [b,c) = [a,c)
     */
    let ranges = [new Range(seed, seed + seedRange)];
    // console.log("---------------------seeds:");
    // console.dir(ranges);
    for (let ki = 1; ki < keys.length; ki++) {
        ranges = findIntervals(ranges, mappings[keys[ki]]);
        // console.log(keys[ki] + " ranges:");
        // console.dir(ranges);
    }
    ranges.forEach((range) => {
        lowest = Math.min(lowest, range.start);
    });
}
console.log(lowest);
