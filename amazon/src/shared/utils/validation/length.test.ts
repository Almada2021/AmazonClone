import { validateNameLength, validatePasswordLength } from './length';

describe('Field Length validation', () => {
  describe('Name field', () => {
    let name = '';
    test('a name should fail length validation if it is not set', () => {
      expect(validateNameLength(name)).toEqual(false);
    });
    test('a name should fail length validation if it is less than 2 characters', () => {
      name = 'j';
      expect(validateNameLength(name)).toEqual(false);
    });
    test('a name should pass length validation if it is  than 2 characters', () => {
      name = 'ja';
      expect(validateNameLength(name)).toEqual(true);
    });
  });
  describe('Password field', () => {
    let password = '';
    test('a password should fail length validation if it is not set', () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test('a password should fail length validation if it is less than 6 characters', () => {
      password = 'jasca';
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test('a password should fail length validation if it is more than 20 characters', () => {
      password = 'jascajascajascajascajasca';
      expect(validatePasswordLength(password)).toEqual(false);
    });
    test('a password should pass length validation if it is  6-20 characters', () => {
      password = 'jaaslca';
      expect(validatePasswordLength(password)).toEqual(true);
    });
  });
});
