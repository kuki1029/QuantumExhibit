import SimplePendulumData from './calculation.js'

const x = new SimplePendulumData(1, 1)

test('Check x position', () => {
    expect(x.getCurrentPosition(0)[0]).toBeCloseTo(0.93969262, 5);
  });

// TODO: Add more tests