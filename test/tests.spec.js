/**
 * @jest-environment jsdom
 */

const api = require('../src/script');

it('should be a test', () => {
  expect(api.testFunction(2, 5).toBe(7));
});
