// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 2, b: 7, action: Action.Subtract, expected: -5 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 1.5, b: 2, action: Action.Multiply, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 30, b: -2, action: Action.Multiply, expected: -60 },
  { a: -5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 'hello', b: 'world', action: Action.Add, expected: null },
  { a: true, b: 'world', action: Action.Subtract, expected: null },
  { a: NaN, b: 'world', action: Action.Multiply, expected: null },
  { a: 'hello', b: 'world', action: Action.Divide, expected: null },
  { a: 'hello', b: '', action: Action.Exponentiate, expected: null },
  { a: 3, b: 5, action: 'some action', expected: null },
  { a: 3, b: 5, action: '$', expected: null },
  { a: 3, b: 5, action: ':', expected: null },
  { a: 3, b: 5, action: '**', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Calculates $a $action $b to be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
