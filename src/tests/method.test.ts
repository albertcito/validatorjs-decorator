import { validate } from '../validator/validateFunction';
import { arg } from '../validator/reflectFunctions';
import ValidatorError from '../validator/ValidatorError';

class Example {
  @validate()
  login(
    @arg('email', 'email|required') email: string,
    @arg('password', 'string|required') password: string,
  ): string {
    return `the values (${email}, ${password}) are good`;
  }
}

describe('Validate method', () => {
  const example = new Example();
  it('validate error method', () => {
    try {
      example.login('uno', 'dos');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it('validate method', () => {
    const a = example.login('me@albertcito.com', 'dos');
    expect(a).toBe('the values (me@albertcito.com, dos) are good');
  });
});
