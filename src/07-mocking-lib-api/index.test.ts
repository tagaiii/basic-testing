// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Hello world!' }),
    } as unknown as AxiosInstance;

    axios.create = jest.fn().mockReturnValue(mockAxiosInstance);

    const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Hello world!' }),
    } as unknown as AxiosInstance;

    axios.create = jest.fn().mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Hello world!' }),
    } as unknown as AxiosInstance;

    axios.create = jest.fn().mockReturnValue(mockAxiosInstance);

    const data = await throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    expect(data).toEqual('Hello world!');
  });
});
