const { spawnSync } = require('child_process');
const path = require('path');

const node = process.execPath;
const script = path.resolve(__dirname, '..', 'calculator.js');

function runOp(op, a, b) {
  const args = [script, op];
  if (a !== undefined) args.push(String(a));
  if (b !== undefined) args.push(String(b));
  const res = spawnSync(node, args, { encoding: 'utf8' });
  return res;
}

// Basic operations from original spec
test('addition: 2 + 3 = 5', () => {
  const r = runOp('add', 2, 3);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('5');
});

test('subtraction: 10 - 4 = 6', () => {
  const r = runOp('sub', 10, 4);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('6');
});

test('multiplication: 45 * 2 = 90', () => {
  const r = runOp('mul', 45, 2);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('90');
});

test('division: 20 / 5 = 4', () => {
  const r = runOp('div', 20, 5);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('division by zero should error', () => {
  const r = runOp('div', 5, 0);
  expect(r.status).not.toBe(0);
  const stderr = String(r.stderr || '') + String(r.stdout || '');
  expect(stderr).toMatch(/division by zero|Division by zero/i);
});

// New tests for extended operations
test('modulo: 5 % 2 = 1', () => {
  const r = runOp('mod', 5, 2);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('1');
});

test('modulo by zero should error', () => {
  const r = runOp('mod', 5, 0);
  expect(r.status).not.toBe(0);
  const stderr = String(r.stderr || '') + String(r.stdout || '');
  expect(stderr).toMatch(/Modulo by zero|modulo by zero/i);
});

test('power: 2 ^ 3 = 8', () => {
  const r = runOp('pow', 2, 3);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('8');
});

test('power: large exponent 2 ^ 10 = 1024', () => {
  const r = runOp('pow', 2, 10);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('1024');
});

test('square root: sqrt 16 = 4', () => {
  const r = runOp('sqrt', 16);
  expect(r.status).toBe(0);
  expect(r.stdout.trim()).toBe('4');
});

test('square root of negative number should error', () => {
  const r = runOp('sqrt', -9);
  expect(r.status).not.toBe(0);
  const stderr = String(r.stderr || '') + String(r.stdout || '');
  expect(stderr).toMatch(/Square root of negative number|square root of negative/i);
});
