import { day6Sample1, day6Data } from "./data.mjs";

const lines = day6Data.split("\n");
const times = lines[0].split(":")[1].trim().split(/\s+/);
const distances = lines[1].split(":")[1].trim().split(/\s+/);
let wins = [];

for(let i = 0; i < times.length; i++){
    let time = parseInt(times[i]);
    let record = parseInt(distances[i]);
    let winner = [];
    for(let vel = 1; vel < time; vel++){
        let ms = time - vel
        let dist = vel * ms;
        if(dist > record){
            console.log(dist)
            winner.push(dist)
        }
    }
    wins.push(winner.length)
}

console.log(wins.reduce((a,c)=>a*c,1))