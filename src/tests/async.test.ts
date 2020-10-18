import { validateAsync } from '../validator/validateFunction';
import { arg } from '../validator/reflectFunctions';
import ValidatorError from '../validator/ValidatorError';

class Example {
  @validateAsync()
  sleep(
    @arg('email', 'email|required') email: string,
    @arg('password', 'string|required') password: string,
  ): string {
    return `the values (${email}, ${password}) are good`;
  }
}

describe('Validate custom rules', () => {
  const example = new Example();
  it('validate error', async () => {
    try {
      await example.sleep('me@albertcitocom', 'dos');
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidatorError);
    }
  });

  it('validate good', async () => {
    const a = await example.sleep('me@albertcito.com', 'dosH23');
    expect(a).toBe('the values (me@albertcito.com, dosH23) are good');
  });
});
