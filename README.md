# Koa-Service-Layer

Realization of [Service Layer](https://en.wikipedia.org/wiki/Service_layer) pattern for Koa

## Table of Contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Documentation](#documentation)
4.  [License](#license)

### Installation

<a name="installation"></a>

```shell
    npm install github:Maxwell88/koa-service-layer
```

or

```shell
    yarn add github:Maxwell88/koa-service-layer
```

### Usage

<a name="usage"></a>

```javascript

// serviceLayer.js
import { ServiceLayer } from "koa-service-layer";

export const new ServiceLayer({
    rules : [
        /* Your rules */
    ]
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
import { Service } from "koa-service-layer";

export default class Create extends Service {
    /*
        there you can iniate your required and custom rules
    */
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

####`Service Layer`

**`constructor(options: object): ServiceLayer`**
**`useService(service: Service): Function`**

The options object has the `rules: object` field:

| Key       | Type                                            | Required | Note                                                                                                                                                                                                                                                                    |
| --------- | ----------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | `String`                                        | +        | Name of rule, and name of static param for `Service` class if type of rule not `hidden`                                                                                                                                                                                 |
| `type`    | one of `hidden`, `required` or `custom` strings | +        | type of function behavior . `hidden` - execute always, don\`t use static field of `Service` class, `required` - execute always, static field of `Service` class is required otherwise `RULE_IS_REQUIRED` exeption, `custom` - execute only if static field is not empty |
| `execute` | `Function`                                      | +        | Name of rule, and name of static param for `Service` class                                                                                                                                                                                                              |

####`Service`
Service class for inheritance with required `execute: function` field (look [usage](#usage)).


####`Exeption`

**`constructor(data: object): Error`**
The data object has the following fields:

| Key      | Type                                 | Required | Note           |
| -------- | ------------------------------------ | -------- | -------------- |
| `fields` | `object` with string fields or empty | +        | Errored fields |
| `code`   | `String`                             | +        | Exeption code  |

### License

<a name="license"></a>

Licensed under the MIT license.
