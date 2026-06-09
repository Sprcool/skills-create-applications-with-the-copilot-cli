#!/usr/bin/env node
/*
 CLI Calculator (src/calculator.js)

 Supports:
  - addition (add, +)
  - subtraction (sub, -)
  - multiplication (mul, *)
  - division (div, /)
  - modulo (mod, %)
  - exponentiation/power (pow, **)
  - square root (sqrt)

 Usage examples:
   node src/calculator.js add 2 3    # 5
   node src/calculator.js sub 5 2    # 3
   node src/calculator.js mul 3 4    # 12
   node src/calculator.js div 10 2   # 5
   node src/calculator.js mod 10 3   # 1
   node src/calculator.js pow 2 8    # 256
   node src/calculator.js sqrt 9     # 3
*/

const [,, op, aRaw, bRaw] = process.argv;

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <a> <b>');
  console.error('For sqrt (unary): node src/calculator.js sqrt <a>');
  console.error('Operations: add, sub, mul, div, mod, pow, sqrt');
}

function exitWithError(msg) {
  console.error('Error:', msg);
  printUsage();
  process.exit(1);
}

if (!op || !aRaw || (op !== 'sqrt' && !bRaw)) {
  exitWithError('Missing required arguments.');
}

const a = Number(aRaw);
const b = bRaw !== undefined ? Number(bRaw) : undefined;

if (Number.isNaN(a) || (bRaw !== undefined && Number.isNaN(b))) {
  exitWithError('Operands must be valid numbers.');
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
  case 'mod':
    // modulo
    if (b === 0) {
      exitWithError('Modulo by zero is not allowed.');
    }
    result = a % b;
    break;
  case 'pow':
    // exponentiation / power
    result = Math.pow(a, b);
    break;
  case 'sqrt':
    // square root (unary)
    if (a < 0) {
      exitWithError('Square root of negative number is not allowed.');
    }
    result = Math.sqrt(a);
    break;
  default:
    exitWithError(`Unsupported operation: ${op}`);
}

console.log(result);
process.exit(0);
