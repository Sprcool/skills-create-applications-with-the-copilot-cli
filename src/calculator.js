#!/usr/bin/env node
/*
 CLI Calculator (src/calculator.js)

 Supports:
  - addition (add, +)
  - subtraction (sub, -)
  - multiplication (mul, *)
  - division (div, /)

 Usage examples:
   node src/calculator.js add 2 3   # 5
   node src/calculator.js sub 5 2   # 3
   node src/calculator.js mul 3 4   # 12
   node src/calculator.js div 10 2  # 5
*/

const [,, op, aRaw, bRaw] = process.argv;

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <a> <b>');
  console.error('Operations: add, sub, mul, div');
}

function exitWithError(msg) {
  console.error('Error:', msg);
  printUsage();
  process.exit(1);
}

if (!op || !aRaw || !bRaw) {
  exitWithError('Missing required arguments.');
}

const a = Number(aRaw);
const b = Number(bRaw);
if (Number.isNaN(a) || Number.isNaN(b)) {
  exitWithError('Both operands must be valid numbers.');
}

let result;
switch (op) {
  case 'add':
    // addition
    result = a + b;
    break;
  case 'sub':
    // subtraction
    result = a - b;
    break;
  case 'mul':
    // multiplication
    result = a * b;
    break;
  case 'div':
    // division
    if (b === 0) {
      exitWithError('Division by zero is not allowed.');
    }
    result = a / b;
    break;
  default:
    exitWithError(`Unsupported operation: ${op}`);
}

console.log(result);
process.exit(0);
