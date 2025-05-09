// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Add })).toBe(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 6, action: Action.Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Multiply })).toBe(30);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 30, b: 6, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 2, action: Action.Exponentiate })).toBe(
      25,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: 'invalid action' })).toBe(
      null,
    );
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'hello', b: 'world', action: Action.Add }),
    ).toBe(null);
  });
});
