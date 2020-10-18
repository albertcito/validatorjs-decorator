import Validator, { ErrorMessages } from 'validatorjs';

import ValidatorError from './ValidatorError';
import { getValidatorParams } from './reflectFunctions';
import getAsyncErrors from './getAsyncErrors';

export function validateAsync(customMessages?: ErrorMessages) {
  return function internatValidate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async function descriptorValue(...args: any[]) {
      const { body, rules } = getValidatorParams(args, target, propertyName);
      const errors = await getAsyncErrors(body, rules, customMessages);
      if (errors) {
        throw new ValidatorError(
          errors,
          'Please, review the following errors',
        );
      }
      return method.apply(this, args);
    };
  };
}

export function validate(customMessages?: ErrorMessages) {
  return function internatValidate(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const method = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function descriptorValue(...args: any[]) {
      const { body, rules } = getValidatorParams(args, target, propertyName);
      const validation = new Validator(body, rules, customMessages);
      if (validation.fails()) {
        throw new ValidatorError(
          validation.errors.errors,
          'Please, review the following errors',
        );
      }
      return method.apply(this, args);
    };
  };
}

export function validateClass(customMessages?: ErrorMessages) {
  return function validateArgs(target: any) {
    // save a reference to the original constructor
    const original = target;
    // wrap orginal constructor with validation behaviour
    const f: any = function f(...args: any) {
      const { body, rules } = getValidatorParams(args, target, 'constructor');
      const validation = new Validator(body, rules, customMessages);
      if (validation.fails()) {
        throw new ValidatorError(validation.errors.errors, 'Please, review the following errors:');
      }
      // eslint-disable-next-line new-cap
      const instance = new original(...args);
      return instance;
    };
    // set f's prototype to orginal's prototype so f keeps original's type
    f.prototype = original.prototype;
    return f;
  };
}
