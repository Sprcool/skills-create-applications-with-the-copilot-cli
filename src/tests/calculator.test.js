const { spawnSync } = require('child_process');
const path = require('path');

const node = process.execPath;
const script = path.resolve(__dirname, '..', 'calculator.js');

function runOp(op, a, b) {
  const res = spawnSync(node, [script, op, String(a), String(b)], { encoding: 'utf8' });
  return res;
}

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
  // non-zero exit and error message
  expect(r.status).not.toBe(0);
  const stderr = String(r.stderr || '') + String(r.stdout || '');
  expect(stderr).toMatch(/division by zero|Division by zero/i);
});
