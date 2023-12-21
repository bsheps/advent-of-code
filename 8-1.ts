import { sample, sample2, input } from "./data.8";

interface node {
    L: string;
    R: string;
}

const data = input.split("\n\n");
const instructions = data[0].split("");
const nodes = data[1].split("\n");

// console.dir(instructions);
// console.dir(nodes);

const map = new Map<string, node>();

nodes.forEach((n) => {
    const key = n.split(" = ")[0];
    const values = n.split(" = (")[1].replace(")", "").split(", ");
    const node: node = { L: values[0], R: values[1] };
    map.set(key, node);
});
console.log(map);
console.log(instructions);

let element = "AAA";
let count = 0;
do {
    let i = 0;
    while (i < instructions.length) {
        count++;
        element = map.get(element)[instructions[i]];
        console.log(element)
        if (element === "ZZZ") break;
        i++;
    }
} while (element !== "ZZZ");
console.log(count);
