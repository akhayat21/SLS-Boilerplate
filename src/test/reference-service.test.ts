import ReferenceService from '../services/reference';

// TODO:
// configure jest to run tests with npm command

describe('Reference Unit Tests', () => {
    const correctPayload =  "www.google.com";
    const incorrectPayload = "test input that is incorrect";

  test('Check a correct reference payload and validate that it returns a successful response', () => {
    const response = ReferenceService.validateReference(correctPayload);
    expect(response).toBe(correctPayload);
  });

  test('Check a incorrect reference payload and validate that it returns a unsuccessful response', () => {
    const response = ReferenceService.validateReference(incorrectPayload);
    expect(response.name).toBe('ValidationError');
  });
});