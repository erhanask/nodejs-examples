const r_value = process.argv[2];

function calculateCircleArea(r) {
    return Math.PI * r * r;
}

console.log(calculateCircleArea(r_value));