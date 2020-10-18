import { validateClass } from '../validator/validateFunction';
import { arg } from '../validator/reflectFunctions';
import ValidatorError from '../validator/ValidatorError';

@validateClass()
class Example {
  public readonly email: string;

  public readonly password: string;

  constructor(
    @arg('email', 'email|required') email: string,
    @arg('password', 'string|required') password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}

describe('Validate constructor', () => {
  it('validate error constructor', async () => {
    try {
      // eslint-disable-next-line no-new
      new Example('uno', 'dos');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it('validate constructor', async () => {
    const example = new Example('me@albertcito.com', 'dos');
    expect(example.email).toBe('me@albertcito.com');
  });
});
