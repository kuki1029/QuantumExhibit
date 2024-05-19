import SimplePendulumData from './spCalculation.js'

const pend = new SimplePendulumData(1, 100)

// Tests for current position.
// Calculations were done manually by hand for comparison

// Tests with length=100 and mass=1
test('X position at t=0', () => {
  expect(pend.getCurrentPosition(0)[0]).toBeCloseTo(93.9692620786, 5);
});

test('Y position at t=0', () => {
  expect(pend.getCurrentPosition(0)[1]).toBeCloseTo(34.2020143326, 5);
});

test('X position at t=100', () => {
  expect(pend.getCurrentPosition(100)[0]).toBeCloseTo(94.0424853538, 5);
});

test('Y position at t=100', () => {
  expect(pend.getCurrentPosition(100)[1]).toBeCloseTo(34.0001610067, 5);
});

test('X position at t=74', () => {
  expect(pend.getCurrentPosition(74)[0]).toBeCloseTo(99.0936842315, 5);
});

test('Y position at t=74', () => {
  expect(pend.getCurrentPosition(74)[1]).toBeCloseTo(-13.4328606567, 5);
});

// Change gravity to 40
const pend40 = new SimplePendulumData(1, 100)
pend40.setGravity(40, 0)

test('X position at t=74', () => {
  expect(pend40.getCurrentPosition(74)[0]).toBeCloseTo(94.568354904, 5);
});

test('Y position at t=74', () => {
  expect(pend40.getCurrentPosition(74)[1]).toBeCloseTo(-32.5088641873, 5);
});

test('X position at t=356', () => {
  expect(pend40.getCurrentPosition(356)[0]).toBeCloseTo(98.4454932371, 5);
});

test('Y position at t=356', () => {
  expect(pend40.getCurrentPosition(356)[1]).toBeCloseTo(17.5637371113, 5);
});

// Change gravity multiple times
const pendmult = new SimplePendulumData(1, 100)

pendmult.setGravity(86, 10)
pendmult.setGravity(20, 20)
pendmult.setGravity(50, 30)

test('Offset after gravity changes', () => {
  expect(pendmult.offset).toBeCloseTo(-4.33695381661, 5);
});

test('X position at t=356', () => {
  expect(pendmult.getCurrentPosition(356)[0]).toBeCloseTo(97.0136543664, 5);
});

test('Y position at t=356', () => {
  expect(pendmult.getCurrentPosition(356)[1]).toBeCloseTo(-24.2559449717, 5);
});