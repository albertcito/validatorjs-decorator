import 'reflect-metadata';
import Validator, { ValidationErrors } from 'validatorjs';

function getAsyncErrors<T>(
  body: T,
  rules: Validator.Rules,
  customMessages?: Validator.ErrorMessages,
) {
  // This is a ESLint config issue
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve: (errors?: ValidationErrors) => void) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => resolve());
    validation.fails(() => resolve(validation.errors.errors));
  });
}

export default getAsyncErrors;
