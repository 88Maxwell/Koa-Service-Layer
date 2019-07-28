# Service-Layer

Realization of [Service Layer](https://en.wikipedia.org/wiki/Service_layer) pattern

## Table of Contents

- [Service-Layer](#service-layer)
  - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Documentation](#documentation)
    - [License](#license)

### Installation

<a name="installation"></a>

```shell
    npm install github:Maxwell88/service-layer
```

or

```shell
    yarn add github:Maxwell88/service-layer
```

### Usage

<a name="usage"></a>

```javascript

// serviceLayer.js
import { ServiceLayer } from "service-layer";
const koaResolver = result => this.body = result;
const koaArgsBuilder = args => args[0];
export const new ServiceLayer(
    koaResolver,
    koaArgsBuilder
    {
        before:[
            /* Your before rules for example: */
            {
                name: "exampleRequireRule",
                type: "require",
                execute: (ctx,args,serviceData) => {
                    /*
                        rule logic and return changed context to another rule 
                        or if it last than to service
                    */
                    return ctx
                }

            }
        ],
        after: [
            /* Your after rules */
        ]
    }
});
```

```javascript
// router.js
import Router from "koa-router";

import ServiceLayer from "./serviceLayer";
import ExampleServiceClass from "./ExampleServiceClass";

const router = new Router({ prefix: config.PREFIX });

router.post("/example", ServiceLayer.useService(ExampleServiceClass));

export default router;
```

```javascript
// router.js
import { Service } from "service-layer";

export default class Create extends Service {
    
    /*
        there you can iniate your required and custom rules for example:
    */
    static exampleRequireRule = "simple args"
    static exampleCustomRule = "simple args"

    async execute(ctx) {
        /*
            service logic
        */
        let result;
        return result; // return data to resolver
    }
}
```

### Documentation

<a name="documentationpi"></a>

- **`Service Layer`**

    `constructor(resolver:function, argumentBuilder: function, rules: object): ServiceLayer`
    `useService(service: Service): Function`
  1. `argumentBuilder` - function that have one field that is array of arguments that receives middleware of Koa/express/hapi etc. and must return changed context that would been used at future.
  2. `resolver` - function that have one argument - `result`,  that argument contain a final result of service, `this` of resolver is a context from `argumentsBuilder`  . Rules don\`t have influence at   resolver `this`
  3. `rules` - object that have two field `before:array` and `after:array` with objects of rule that have 3 required field `name`, `type`, `execute`:

        | Key       | Type                                            | Required | Note                                                                                                                                                                                                                                                                      |
        | --------- | ----------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `name`    | `String`                                        | +        | Name of rule, and name of static param for `Service` class if type of rule not `hidden`                                                                                                                                                                                   |
        | `type`    | one of `hidden`, `required` or `custom` strings | +        | type of function behavior . `hidden` - execute always, don\`t use static field of `Service` class, `required` - execute always, static field of `Service` class is required otherwise `RULE_IS_REQUIRED` exeption, `custom` - execute only if static field is not empty |
        | `execute` | `Function`                                      | +        | Name of rule, and name of static param for `Service` class                                                                                                                                                                                                                 |

- **`Service`**
  
    Service class for inheritance with required `execute: function` field (look [usage](#usage)).


- **`Exeption`**

    **`constructor(data: object): Error`**
    The data object has the following fields:

    | Key      | Type                                 | Required | Note           |
    | -------- | ------------------------------------ | -------- | -------------- |
    | `fields` | `object` with string fields or empty | +        | Errored fields |
    | `code`   | `String`                             | +        | Exeption code  |

### License

<a name="license"></a>

Licensed under the MIT license.
