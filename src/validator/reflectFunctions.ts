import 'reflect-metadata';
import Validator from 'validatorjs';
import { Struct, ValidatorConfig } from './interface';

const requiredMetadataKey = Symbol('key');

export function arg(name: string, rules: string) {
  return function setParamSchemaMetadata(
    target: Object,
    propertyKey: string | symbol,
    index: number,
  ) {
    const key = typeof propertyKey === 'undefined' ? 'constructor' : propertyKey;
    const existingParameters: ValidatorConfig[] = Reflect
      .getOwnMetadata(requiredMetadataKey, target, key) || [];
    existingParameters.push({ name, index, rules });
    Reflect.defineMetadata(requiredMetadataKey, existingParameters, target, key);
  };
}

export const getValidatorParams = (args: any, target: any, propertyName: string) => {
  const parameters: ValidatorConfig[] = Reflect.getOwnMetadata(
    requiredMetadataKey,
    target,
    propertyName,
  );
  const body: Struct = {};
  const rules: Validator.Rules = {};
  if (parameters) {
    for (let i = 0; i < parameters.length; i += 1) {
      const param = parameters[i];
      body[param.name] = args[param.index];
      rules[param.name] = param.rules;
    }
  }
  return {
    body,
    rules,
  };
};
