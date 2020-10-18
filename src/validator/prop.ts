import Validator, { ErrorMessages } from 'validatorjs';
import ValidatorError from './ValidatorError';

const prop = (
  rules: any,
  customMessages?: ErrorMessages,
) => function propValidator(target: any, key: string | symbol): void {
  let val = target[key];
  const propertyName = String(key);

  const getter = () => val;

  const setter = (value: any) => {
    const body = { [propertyName]: value };
    const rulesObj = { [propertyName]: rules };
    const validation = new Validator(body, rulesObj, customMessages);
    if (validation.fails()) {
      throw new ValidatorError(
        validation.errors.errors,
        'Please, review the following errors',
      );
    }
    val = value;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
};

export default prop;
