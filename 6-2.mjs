import { day6Sample1, day6Data } from "./data.mjs";

const lines = day6Data.split("\n");
const times = lines[0].split(":")[1].trim().split(/\s+/);
const distances = lines[1].split(":")[1].trim().split(/\s+/);

const time = times.reduce((a, c) => a + c, "");
const record = distances.reduce((a, c) => a + c, "");
console.log(time);
console.log(record);
let count = 0;

for (let vel = 1; vel < time; vel++) {
    let ms = time - vel;
    let dist = vel * ms;
    if (dist > record) {
        count++;
    }
}
console.log(count)