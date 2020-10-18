ValidatorJS + Decorator + TypeScript
--------------------------------------

[![Build Status](https://travis-ci.com/albertcito/validatorjs-decorator.svg?branch=production)](https://travis-ci.com/albertcito/validatorjs-decorator)

Validate functions, constructor and properties with [validatorJS](https://github.com/skaterdav85/validatorjs) and Typescript [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

## Install

To install run one of this instructions: 

- `npm install validatorjs-decorator`
- `yarn add  validatorjs-decorator` 

## Validate properties

```typescript
import { prop } from 'validatorjs-decorator';

class Example {
  @prop('email|required', { required: 'You forgot to give a :attribute' })
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
```

## Validate Constructor
```typescript
import { validateClass, arg } from 'validatorjs-decorator';

@validateClass({ required: 'You forgot to give a :attribute' })
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
```

## Validate function
```typescript
import { validate, arg } from 'validatorjs-decorator';

class Example {
  @validate({ required: 'You forgot to give a :attribute' })
  login(
    @arg('email', 'email|required') email: string,
    @arg('password', 'string|required') password: string,
  ): string {
    return `the values (${email}, ${password}) are good`;
  }
}
```

## Credits
Created by Albert Tjornehoj  
E-Mail: me@albertcito.com  
Website: [albertcito.com](https://albertcito.com)