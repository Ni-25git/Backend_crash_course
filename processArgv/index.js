const sum = require("./sum")
const sub = require('./sub')
const div = require("./div")
const mul = require("./mul")

const operation = process.argv[2];
const num1 = parseFloat(process.argv[3]);
const num2= parseFloat(process.argv[4]);

let result;
switch(operation){
    case 'sum':
        result = sum(num1,num2);
        break;
    case 'sub':
        result = sub(num1,num2);
        break;
    case 'div':
        result = div(num1 , num2);
        break;
    case 'mul':
        result= mul(num1, num2);
        break;        
        
    default:
        console.log('provide a valid function')    
}

console.log(`The result of ${operation}(${num1}, ${num2}) is: ${result}`);