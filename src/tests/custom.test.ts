import Validator from 'validatorjs';
import { validate } from '../validator/validateFunction';
import { arg } from '../validator/reflectFunctions';
import ValidatorError from '../validator/ValidatorError';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
Validator.register(
  'strict_password',
  (password) => passwordRegex.test(password as string),
  'password must contain at least one uppercase letter, one lowercase letter and one number',
);

class Example {
  @validate()
  login(
    @arg('email', 'email|required') email: string,
    @arg('password', 'string|required|strict_password') password: string,
  ): string {
    return `the values (${email}, ${password}) are good`;
  }
}

describe('Validate custom rules', () => {
  const example = new Example();
  it('validate error', () => {
    try {
      example.login('me@albertcito.com', 'dos');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it('validate good', () => {
    const a = example.login('me@albertcito.com', 'dosH23');
    expect(a).toBe('the values (me@albertcito.com, dosH23) are good');
  });
});
