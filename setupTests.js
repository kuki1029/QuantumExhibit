import {expect} from '@jest/globals';

// Custom test function to extend Jest to allow us to deep test arrays
function toBeCloseDeepArray(actual, expected, precision) {
    if (typeof actual !== 'object') {
      throw new TypeError('The actual value must be an array!');
    }
    else if (typeof expected !== 'object') {
      throw new TypeError('The expected values must be an array!');
    }
    else if (typeof precision !== 'number') {
      throw new TypeError('The precision value has to be a number!')
    }
    else if (actual.length !== expected.length) {
      throw new TypeError('The length of actual and expected need to be equal. ')
    }
    else if (typeof actual[0] !== 'number') {
      throw new TypeError('The elements within the array must be numbers!')
    }
  
    // Do testing
    let pass = true
    for (var i = 0; i < actual.length; i++) {
      let expectedDiff = Math.pow(10, -precision) / 2;
      let receivedDiff = Math.abs(expected[i] - actual[i]);
      pass = receivedDiff < expectedDiff;
      if (!pass) break;
    }
    
    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            `${actual[i]} at index ${i}`,
          )} not to be  ${this.utils.printExpected(
            expected[i],
          )}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            actual[i],
          )} to be ${this.utils.printExpected(
            expected[i],
          )}`,
        pass: false,
      };
    }
  }
  
  expect.extend({
      toBeCloseDeepArray,
  });