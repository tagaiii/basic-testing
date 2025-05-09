// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);

    expect(timeoutSpy).toBeCalledWith(callback, 1000);

    timeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const intervaltSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);

    expect(intervaltSpy).toBeCalledWith(callback, 1000);

    intervaltSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    const intervaltSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);

    expect(intervaltSpy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);

    intervaltSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('./text.txt');

    expect(joinSpy).toBeCalledWith(__dirname, './text.txt');

    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('./text.txt');

    expect(result).toBeNull();
    jest.restoreAllMocks();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from('Hello world!'));
    const result = await readFileAsynchronously('./text.txt');

    expect(result).toBe('Hello world!');
    jest.restoreAllMocks();
  });
});
