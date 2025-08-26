import * as dummyFunctions from "../../src/service/dummy-service";

afterEach(() => {
  jest.restoreAllMocks();   // restores original implementations
});

test('My first test', () => {
    jest.spyOn(dummyFunctions, 'helper').mockImplementation(() => true);
    const result = dummyFunctions.execute();
    expect(result).toBe("Learning js");
});

test('My second test', () => {
    jest.spyOn(dummyFunctions, 'helper').mockImplementation(() => false);
    const result = dummyFunctions.execute();
    expect(result).toBe("Learning python");
});
