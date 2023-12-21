import { sample, sample2, sample3, input } from "./data.8";

interface node {
    L: string;
    R: string;
}

const data = input.split("\n\n");
const instructions = data[0].split("");
const nodes = data[1].split("\n");

const map = new Map<string, node>();

nodes.forEach((n) => {
    const key = n.split(" = ")[0];
    const values = n.split(" = (")[1].replace(")", "").split(", ");
    const node: node = { L: values[0], R: values[1] };
    map.set(key, node);
});
// console.log(map.keys());
// console.log(instructions);

let elements = Array.from(map.keys()).filter((x) => {
    return x.match(/.*.*[A]/);
});

let cycles:number[] = [];
let firstZ = null;
let count = 0;

let elementIndex = 0;
let element = elements[elementIndex]
console.log(elements)
do {
    let i = 0;
    while (i < instructions.length) {
        count++;
        const dir = instructions[i];
        element = map.get(element)[dir]

        if(element.match(/..Z/)){
            if(firstZ == null){
                firstZ = element
                count = 0;
            }else if(firstZ === element){
                cycles.push(count)
                firstZ = null;
                element = elements[++elementIndex];
                break;
            }
        }
        i++;
    }
} while (cycles.length < elements.length);

function gcd(a:number,b:number){
    if(b === 0){
        return a;
    }
    return gcd(b, a % b)
}
console.log(cycles)
let initial:number = cycles.pop();
console.log(cycles.reduce((a,c)=>( (a * c) / gcd(a,c)),initial));
