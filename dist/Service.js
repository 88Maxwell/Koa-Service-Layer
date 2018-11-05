"use strict";

exports.__esModule = true;
// import Exception from './Exception';

class Service {
    async execute(args) {
        const result = await this.body(args);

        return result;
    }
}
exports.default = Service;