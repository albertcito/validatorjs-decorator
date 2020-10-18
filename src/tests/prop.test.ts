import ValidatorError from '../validator/ValidatorError';
import prop from '../validator/prop';

class Example {
  @prop('email|required')
  public readonly email: string;

  public readonly password: string;

  constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}

describe('Validate prop', () => {
  it('validate error prop', () => {
    try {
      // eslint-disable-next-line no-new
      new Example('uno', 'dos');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it('validate prop', () => {
    const example = new Example('me@albertcito.com', 'dos');
    expect(example.email).toBe('me@albertcito.com');
  });
});
