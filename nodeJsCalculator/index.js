
const crypto = require('crypto');

const args = process.argv.slice(2); // Remove 'node' and 'index.js'

// Extract operation and arguments
const operation = args[0];
const operands = args.slice(1).map(parseFloat); // Convert operands to numbers

function generateRandomNumber(length) {
    if (!length) {
        console.log("Provide length for random number generation.");
        return;
    }
    const byteLength = Math.ceil(length / 2); 
    const randomBytes = crypto.randomBytes(byteLength);
    const randomNumber = parseInt(randomBytes.toString('hex'), 16);
    console.log(randomNumber);
}

switch (operation) {
    case 'add':
        console.log(operands.reduce((a, b) => a + b, 0));
        break;
    case 'sub':
        console.log(operands.reduce((a, b) => a - b));
        break;
    case 'mult':
        console.log(operands.reduce((a, b) => a * b, 1));
        break;
    case 'divide':
        if (operands.length !== 2 || operands[1] === 0) {
            console.log("Invalid division operation");
        } else {
            console.log(operands.reduce((a, b) => a / b));
        }
        break;
    case 'sin':
        if (operands.length !== 1) {
            console.log("Invalid sine operation");
        } else {
            console.log(Math.sin(operands[0]));
        }
        break;
    case 'cos':
        if (operands.length !== 1) {
            console.log("Invalid cosine operation");
        } else {
            console.log(Math.cos(operands[0]));
        }
        break;
    case 'tan':
        if (operands.length !== 1) {
            console.log("Invalid tangent operation");
        } else {
            console.log(Math.tan(operands[0]));
        }
        break;
    case 'random':
        generateRandomNumber(operands[0]);
        break;
    default:
        console.log("Invalid operation");
}