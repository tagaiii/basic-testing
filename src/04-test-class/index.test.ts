import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);

    expect(() => account.withdraw(150)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const sender = getBankAccount(100);
    const receiver = getBankAccount(0);

    expect(() => sender.transfer(150, receiver)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const sender = getBankAccount(100);

    expect(() => sender.transfer(50, sender)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);

    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);

    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const sender = getBankAccount(100);
    const receiver = getBankAccount(0);
    sender.transfer(50, receiver);

    expect(sender.getBalance()).toBe(50);
    expect(receiver.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock).mockReturnValue(100);
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();

    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (lodash.random as jest.Mock).mockReturnValue(100);
    const account = getBankAccount(0);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockReturnValue(0);
    const account = getBankAccount(0);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
